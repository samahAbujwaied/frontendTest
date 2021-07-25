import React, { Component } from 'react'
import axios from 'axios'
import {Button,Card} from 'react-bootstrap'
export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinksData: {},
            show: false,       
        }
    }
    componentDidMount = async () => {
        const apiGetDrinks = `http://localhost:3456/getDrink`;
        try {
            const showDrinks = await axios.get(apiGetDrinks);
            const allData = showDrinks.data;
            console.log(allData);
            this.setState({
                drinksData: allData,
                show: true
            })
        } catch {
            console.log('no data');
        }


    }
    postData=async(e,item)=>{
      e.preventDefault();
      const sendData = {
        strDrinkThumb:item.strDrinkThumb,
        strDrink:item.strDrink,
        idDrink:item.idDrink

      }
     
       await axios.post(`http://localhost:3456/postDrink`,sendData);
    }
    render() {
        return (
            <>
                {this.state.show && this.state.drinksData.map((item,idx) => {
                    return (
                        <>
                            <Card key={item._id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.strDrinkThumb} />
                                <Card.Body>
                                    <Card.Title>{item.strDrink}</Card.Title>
                                    <Card.Text>
                                       {item.idDrink}
                                     </Card.Text>
                                    <Button onClick={(e)=>this.postData(e,item)} variant="primary">Add To Fav</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </>
        )
    }
}

export default HomePage
