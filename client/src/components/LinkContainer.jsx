import Table from "./Table"
import Form from "./Form"
import { useEffect, useState } from "react"

function LinkContainer() {
  const [favLinks, setFavLinks] = useState([])

  const getLinks = async () => {
    try {
      const response = await fetch('/links')
      const jsonData = await response.json()
      setFavLinks(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getLinks()
  }, [])

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/links/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      await getLinks()
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleSubmit = async (favLink) => {
    try {
      const response = await fetch('/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favLink),
      })

      if (!response.ok) {
        throw new Error('Create failed')
      }

      await getLinks()
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div>
      <h1>My Favorite Links</h1>
      <p>Add a new link with a name and a URL to the table!</p>
      <Table data={favLinks} removeLink={handleRemove} />
      <h1>Add New</h1>
      <Form submitNewLink={handleSubmit} />
    </div>
  )
}

export default LinkContainer