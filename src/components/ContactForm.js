import React from "react"
import styled, { css } from "styled-components"

const Form = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`
const Field = styled.div`
  display: grid;
  grid-gap: 0.5rem;
`
const Input = css`
  padding: 1.25rem;
  color: inherit;
  font-size: 0.8em;
  font-family: inherit;
  background-color: hsla(0, 0%, 70%, 0.2);
  border: none;
  border-radius: 0.25rem;

  &::placeholder {
    font-style: italic;
  }
`

const Textbox = styled.input`
  ${Input}
`

const Textarea = styled.textarea`
  ${Input}
  resize: none;
`

const Button = styled.button`
  justify-self: start;
  padding: 1em 1.75em;
  color: var(--background-color);
  font: inherit;
  font-weight: 600;
  font-size: 0.8em;
  font-style: italic;
  background-color: var(--text-color);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.state = {
      status: "",
    }
  }

  render() {
    const { status } = this.state
    return (
      <Form
        onSubmit={this.submitForm}
        action="https://formspree.io/mdokovkv"
        method="POST"
      >
        <Field>
          <label>Name</label>
          <Textbox type="text" name="name" placeholder="First Last" />
        </Field>
        <Field>
          <label>Email *</label>
          <Textbox
            type="email"
            name="email"
            placeholder="hello@fakedoors.com"
            required
          />
        </Field>
        <Field>
          <label>Message *</label>
          <Textarea
            type="text"
            name="message"
            placeholder="What's up?"
            rows="5"
            required
          />
        </Field>
        {status === "SUCCESS" ? (
          <p>Thanks!</p>
        ) : (
          <Button type="submit">Submit</Button>
        )}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </Form>
    )
  }

  submitForm(ev) {
    ev.preventDefault()
    const form = ev.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        this.setState({ status: "SUCCESS" })
      } else {
        this.setState({ status: "ERROR" })
      }
    }
    xhr.send(data)
  }
}
