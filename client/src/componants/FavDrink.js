import React, { Component } from 'react'
import axios from 'axios'
import {Button,Card,Form} from 'react-bootstrap'

export class FavDrink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinksDatafromDB: {},
            show: false,
            showdata:false,       
            imgpath:'',
            drinkName:'',
            idcard:'',
            index:''
        }
    }
    componentDidMount = async () => {
        const apiGetDrinks = `http://localhost:3456/getDrinkFromDB`;
        try {
            const showDrinks = await axios.get(apiGetDrinks);
            const allData = showDrinks.data;
            console.log(allData);
            this.setState({
                drinksDatafromDB: allData,
                show: true
            })
        } catch {
            console.log('no data');
        }
    }
    deleteData = async(e,idx)=>{
        e.preventDefault();
       
        const deleteUrl = `http://localhost:3456/deleteData/${this.state.drinksDatafromDB[idx]._id}`
        const deletraxios = await axios.delete(deleteUrl)
        this.setState({
            drinksDatafromDB:deletraxios.data
        })
    }
    UpdateData=(idx)=>{
        this.setState({
            showdata:true,
            imgpath:this.state.drinksDatafromDB[idx].strDrinkThumb,
            drinkName:this.state.drinksDatafromDB[idx].strDrink,
            idcard:this.state.drinksDatafromDB[idx].idDrink,
            index:idx
        })
    }
    changeImg=(e)=>{
        this.setState({
            imgpath:e.target.value
        })
    }
    changeDrink=(e)=>{
        this.setState({
            drinkName:e.target.value
        })
    }
    changeId=(e)=>{
        this.setState({
            idcard:e.target.value
        })
    }
    SubmitData= async(e)=>{
        e.preventDefault();
         const updateBody=({
            strDrinkThumb:this.state.imgpath,
            strDrink:this.state.drinkName,
            idDrink:this.state.idcard
        })
        const putUrl = `http://localhost:3456/putData/${this.state.drinksDatafromDB[this.state.index]._id}`
        const updataData = await axios.put(putUrl,updateBody)
        this.setState({
            drinksDatafromDB:updataData.data
        })
    }
    render() {
        console.log(this.state.imgpath);
        console.log(this.state.drinkName);
        console.log(this.state.idcard);

        return (
            <>
             {
                               this.state.showdata &&
                                <Form onSubmit={(e)=>this.SubmitData(e)} >
                               <Form.Group className="mb-3" controlId="formBasicEmail">
                                 <Form.Label>Update strDrinkThumb</Form.Label>
                                 <Form.Control onChange={this.changeImg} value={this.state.imgpath} type="text" placeholder="Update strDrinkThumb" />
                               </Form.Group>
                             
                               <Form.Group className="mb-3" controlId="formBasicPassword">
                                 <Form.Label>Update strDrink</Form.Label>
                                 <Form.Control onChange={this.changeDrink} value={this.state.drinkName} type="text" placeholder="Update strDrink" />
                               </Form.Group>
                               <Form.Group className="mb-3" controlId="formBasicPassword">
                                 <Form.Label>Update idDrink</Form.Label>
                                 <Form.Control onChange={this.changeId} value={this.state.idcard} type="text" placeholder="Update idDrink" />
                               </Form.Group>
                              
                               <Button variant="primary" type="submit">
                                Update 
                               </Button>
                             </Form>
                           }
             {this.state.show && this.state.drinksDatafromDB.map((item,idx) => {
                    return (
                        <>
                          
                            <Card key={item._id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.strDrinkThumb} />
                                <Card.Body>
                                    <Card.Title>{item.strDrink}</Card.Title>
                                    <Card.Text>
                                       {item.idDrink}
                                     </Card.Text>
                                    <Button onClick={(e)=>this.deleteData(e,idx)}  variant="danger">Delete</Button><br/><br/>
                                    <Button onClick={()=>this.UpdateData(idx)}  variant="primary">Update</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </>
        )
    }
}

export default FavDrink
