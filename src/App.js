import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then(resp => {
      setRepositories(resp.data)
    })
  }, [])

  async function handleAddRepository() {
    

    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: "https://github.com/Rocketseat/umbriel",
      techs: ['React', 'ReactJs', 'React Native']
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
      .then((resp) => {
        if ((resp.status === 204)) setRepositories(repositories.filter(r=>r.id !== id))
      })
  }

  return (
    <div>
          <ul data-testid="repository-list">
            {repositories.map(p => (
              <li key={p.id}>
                {p.title}

                <button onClick={() => handleRemoveRepository(p.id)}>
                  Remover
                </button>
              </li>
             ))
            }
          </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
