import { useState } from "react"

function Form(props) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.submitNewLink(formData)

    setFormData({
      name: "",
      url: "",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Link Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <br />

      <label htmlFor="url">Link URL:</label>
      <input
        type="text"
        name="url"
        id="url"
        value={formData.url}
        onChange={handleChange}
      />
      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  )
}

export default Form