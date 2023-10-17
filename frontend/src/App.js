import './App.css';
import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { fetchGroupsAndPersons } from './dataService';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetchGroupsAndPersons()
    .then(axios.spread((groupsResponse, personsResponse) => {
      const groupsData = groupsResponse.data;
      const personsData = personsResponse.data;

      const findPersonById = id => personsData.find(person => person.id === id) || { id };

      const groupNodes = groupsData.map(group => ({
        id: `group-${group.id}`,
        name: group.name,
        color: '#FF0000'  // Red for groups
      }));

      const personNodes = personsData.map(personOrId => {
        const person = typeof personOrId === 'object' ? personOrId : findPersonById(personOrId);
        return {
          id: `person-${person.id}`,
          name: person.name,
          color: '#00FF00'  // Green for persons
        };
      });

      const groupLinks = groupsData.flatMap(group => 
        (group.persons || []).map(personOrId => {
          const person = typeof personOrId === 'object' ? personOrId : findPersonById(personOrId);
          return {
            source: `group-${group.id}`,
            target: `person-${person.id}`
          };
        })
      );

      setData({
        nodes: [...groupNodes, ...personNodes],
        links: groupLinks
      });
    }))
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <div style={{ width: '800px', height: '600px' }}>
      <ForceGraph2D
        graphData={data}
        nodeAutoColorBy="color"
        nodeLabel="name"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
      />
    </div>
  );
}

export default App;
