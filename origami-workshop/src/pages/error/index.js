import React from "react";
import styles from "./index.module.css"
import PageLayot from "../../components/page-layout"
import Title from "../../components/title"
import imageSource from "./imageSource"

const ErrorPage = () => {

    return (
        <PageLayot>   
                <Title title="Something went wrong..." />         
                <img  className = {styles.img} src={imageSource} alt="hmmm emodji" />
        </PageLayot>
    )


}

export default ErrorPage;



