import React, {useState , useCallback, useEffect, useContext } from "react";
import styles from "./index.module.css";
import Origam from "../origam";
import getOrigami from "../../utils/origami";
import UserContext from "../../Context"

const Origamis = (props) => {

    const [origamis, setOrigamis] = useState([]);
    const context = useContext(UserContext)
    
    const getOrigamis = useCallback(async () =>{
        if (props.length === 3) {
            
            const allOrigamis = await getOrigami()
            const origamis = allOrigamis.filter(origam => origam.author._id === context.user.id).reverse().slice(0,3)
            setOrigamis(origamis)
        } else {

            const origamis = await getOrigami(props.length)
            setOrigamis(origamis)
        }                                          
    }, [props.length])


    const renderOrigamis = () => {

        return origamis.map((origam, index) => {
            return <Origam key = {origam._id} index = {index} {...origam}/>
        })
    }

    useEffect(() => {
        getOrigamis()
    }, [props.updatedOrigami, getOrigamis])

        return (
            <div className={styles["origamis-wrapper"]}>
                {renderOrigamis()}
            </div>
        )
}

export default Origamis;