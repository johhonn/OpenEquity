import React,{Component} from 'react';

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "../../components/CustomButtons/Button";

import Input from "../input/Input"
import moment from 'moment'



class Coin extends Component {
    constructor(props, context) {
        super(props)
    console.log(props)
      
        
this.state={
accounts:props.accounts[0],
web3:'',
parametersSet:false,


  orderForm: {
    decimals: {
        elementType: 'input',
        label: 'decimal uints',
        elementConfig: {
            type: 'text',
            placeholder: 'enter decimal uints'
        },
        value: ''
    },
    CoinSymbol: {
        elementType: 'input',
        label: 'symbol',
        elementConfig: {
            type: 'text',
            placeholder: 'enter symbol'
        },
        value: ''
    },
    CoinName: {
        elementType: 'input',
        label:'Coin Name',
        elementConfig: {
            type: 'text',
            placeholder: 'coin name'
        },
        value: ''
    },
    CoinPrice: {
        elementType: 'input',
        label:'Coin Price',
        elementConfig: {
            type: 'text',
            placeholder: 'coin price'
        },
        value: ''
    },
    TotalSupply: {
        elementType: 'input',
        label:'Total Coin Supply',
        elementConfig: {
            type: 'text',
            placeholder: 'total coin supply'
        },
        value: ''
    },
    FundingGoal: {
        elementType: 'input',
        label:'Funding Goal',
        elementConfig: {
            type: 'text',
            placeholder: 'Funding Goal'
        },
        value: ''
    },
   UserstoAdmit: {
        elementType: 'input',
        label:'Users to Admit',
        elementConfig: {
            type: 'text',
            placeholder: 'Enter total Users'
        },
        value: ''
    },
    PublicShare: {
        elementType: 'input',
        label:'Public Share',
        elementConfig: {
            type: 'text',
            placeholder: 'enter public share percentage'
        },
        value: ''
    },
    StartDate: {
        elementType: 'date',
        label:'Sale Start Date',
        elementConfig: {
            type: 'text',
            placeholder: ''
        },
        value: ''
    },
    EndDate: {
      elementType: 'date',
      label:'Sale End Date',
      elementConfig: {
          type: 'text',
          placeholder: ''
      },
      value: ''
    }
  
     

},

instance:'',
owner:'',
contracts:context.drizzle.contracts,
partner1:'',
partner2:'',
partner3:'',
partner4:'',
partner5:'',
p1s:'',
p2s:'',
p3s:'',
p4s:'',
p5s:''

}  

}
  


componentWillMount(){
  console.log(this.props)
  console.log(this.context)
   
  }




handleChange = (fieldName, event) => {
  const state = {
    ...this.state,
  };
  state[fieldName] = event.target.value;
  this.setState(state);
  console.log(state)
};

inputChangedHandler = (event, inputIdentifier,inputType) => {
    console.log(inputIdentifier)
    
    console.log(inputType)
  const updatedOrderForm = {
      ...this.state.orderForm
  };
  const updatedFormElement = { 
      ...updatedOrderForm[inputIdentifier]
  };
  
  if(inputType=='date'){
    //console.log()
    console.log(event)
    let event=moment(event).unix()
     
    console.log(moment(event).unix())
    
    updatedFormElement.value=event
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
    
  }else{
  updatedFormElement.value = event.target.value;
  updatedOrderForm[inputIdentifier] = updatedFormElement;
  console.log(event.target.value)
  this.setState({orderForm: updatedOrderForm},console.log(this.state));
  } 
}
handleSubmit2=()=>{
    const formElementsArray = [];
    const partnerArray=[]
    const partnerShares=[]
    const NumParams=[]
    const author=this.state.accounts
    
    if(this.state.partner1.length>1){
    partnerArray.push(this.state.partner1)
    }
    if(this.state.partner2.length>1){
    partnerArray.push(this.state.partner2)
    }
    if(this.state.partner3.length>1){
    partnerArray.push(this.state.partner3)
    }
    if(this.state.partner4.length>1){
    partnerArray.push(this.state.partner4)
    }
    if(this.state.partner5.length>1){
    partnerArray.push(this.state.partner5)
    }
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        });
    }
    console.log( formElementsArray)
    let tokenName=formElementsArray[1].config.value
    let tokenSymbol=formElementsArray[2].config.value
    NumParams.push(formElementsArray[5].config.value)
    NumParams.push(formElementsArray[6].config.value)
    NumParams.push(formElementsArray[8].config.value)
    NumParams.push(formElementsArray[9].config.value)
    NumParams.push(1)
    NumParams.push(1)
    NumParams.push(formElementsArray[3].config.value)
    NumParams.push(formElementsArray[0].config.value)
    if(this.state.p1s.length>2){
        console.log(this.state.p1s.length)
    partnerShares.push(this.state.p1s)
    }
    if(this.state.p2s.length>2){
        console.log(this.state.p1s.length)
    partnerShares.push(this.state.p2s)
    }
    if(this.state.p3s.length>2){
    partnerShares.push(this.state.p3s)
    }
    if(this.state.p4s.length>2){
    partnerShares.push(this.state.p4s)
    }
    if(this.state.p5s.length>2){
    partnerShares.push(this.state.p5s)
    }
    console.log(partnerArray)
    console.log(NumParams)
    console.log(tokenName)
    console.log(tokenSymbol)
    console.log(this.state.contracts.CoinDeployer.methods.deployCoin)
    const stackId = this.state.contracts.CoinDeployer.methods.deployCoin(author,tokenName,tokenSymbol,partnerShares,NumParams,partnerArray).send({
        from: this.state.accounts
      });
  
     
    //uint goal	numParams[0];
      //uint eligibleCount numParams[1];
	    //uint startdate numParams[2];
	    //uint enddate numParams[3];
      //uint   weightCoefficient numParams[4];
      //uint   weightCoefficient2 numParams[5];
      // uint price numParams[6];
      // decimal places numParams[7]
      // PartnerShares[0] founder coin, PartnerShares[1] coins for sale
       }
 handleSubmit=()=>{
    this.setState({parametersSet:true})
 }     
    
    



render(){
   var display=null
   
  
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
      });
    }
    if(this.state.parametersSet==false){
    let form = (
      <form >
          {formElementsArray.map(formElement => (
              <Input 
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  label={formElement.config.label}
                  changed={(event) => this.inputChangedHandler(event, formElement.id,formElement.config.elementType)} />
          ))}
          
      </form>
     
    );
    display=(
        <div>
            
                {form}
               
                
            <Button size="lg" color="primary" onClick={this.handleSubmit}>Set Parameters</Button>
        </div>
    )
    }
    else{
        display=(
            <div>
                <h1>Add Token Partners</h1>
                <form action="/action_page.php">
                <label>Partner 1:</label>
               <input type="text" style={{margin:"5px"}} placeholder="enter address" onChange={this.handleChange.bind(this,'partner1')}></input>
               <input type="text"style={{margin:"5px"}} placeholder="enter share"  onChange={this.handleChange.bind(this,'p1s')}></input> 
               <br></br>
               <label>Partner 2:</label>
               <input type="text" style={{margin:"5px"}}  placeholder="enter address" onChange={this.handleChange.bind(this,'partner2')}></input>
               <input type="text"style={{margin:"5px"}} placeholder="enter share" onChange={this.handleChange.bind(this,'p2s')}></input> 
               <br></br>
               <label>Partner 3:</label>
               <input type="text" style={{margin:"5px"}} placeholder="enter address" onChange={this.handleChange.bind(this,'partner3')}></input>
               <input type="text"style={{margin:"5px"}}  placeholder="enter share" onChange={this.handleChange.bind(this,'p3s')}></input> 
               <br></br>
               <label>Partner 4:</label>
               <input type="text" style={{margin:"5px"}} placeholder="enter address" onChange={this.handleChange.bind(this,'partner4')}></input>
               <input type="text"style={{margin:"5px"}} placeholder="enter share" onChange={this.handleChange.bind(this,'p4s')}></input> 
               <br></br>
               <label>Partner 5:</label>
               <input type="text" style={{margin:"5px"}} placeholder="enter address" onChange={this.handleChange.bind(this,'partner5')}></input>
               <input type="text"style={{margin:"5px"}} placeholder="enter share" onChange={this.handleChange.bind(this,'p5s')}></input> 
               <br></br>
                </form>    
                <Button size="lg" color="primary" onClick={this.handleSubmit2}>Mint Coin</Button>
            </div>
        )
        
    }


return(
<div style={{backgroundColor: "#8FCC93",borderRadius: "5px",padding:"25px"}}>{display}</div>

  
);







   
   
}
}   
Coin.contextTypes = {
    drizzle: PropTypes.object
  }
export default Coin;