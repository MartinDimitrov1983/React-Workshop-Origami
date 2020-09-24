import React, { useState } from "react";
import styled from 'styled-components'
import Title from "../../components/title";
import PageLayout from "../../components/page-layout";
import SubmitButton from "../../components/button/submit-button"
import Origamis from "../../components/origamis"
import getCookie from "../../utils/cookie"

const ShareThoughts = () => {

    const [publication, setPublication] = useState("")
    const [updatedOrigami, setUpdatedOrigami] = useState([])

    const handleSubmit = async() => {

      await fetch("http://localhost:9999/api/origami", {
        method : "POST",
        body : JSON.stringify({
          description : publication
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('x-auth-token')
        }
      })

      setPublication("")
      setUpdatedOrigami([...updatedOrigami, 1])
    }

    return (
        <PageLayout>
            <Title title="Share your thoughts..." />

            <Container>
                <div>
                    <TextArea value={publication} onChange={e => setPublication(e.target.value)} />
                </div>
                <div>
                    <SubmitButton title="Post" onClick={handleSubmit}/>
                </div>
            </Container>
            <H2>Last 3 posts on your wall</H2>
            <Origamis length={3} updatedOrigami={updatedOrigami}/>
        </PageLayout>
    )

}

const Container = styled.div`
  text-align: center;
`

const TextArea = styled.textarea`
  width: 300px;
  height: 100px;
  resize: none;
`
const H2 = styled.h2`
  color: #234465;
  text-decoration: underline;
`

export default ShareThoughts