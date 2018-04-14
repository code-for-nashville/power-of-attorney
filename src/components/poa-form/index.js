import * as React from 'react'
import styles from './styles'

class PoAForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({

  })

  constructor(props: Form) {
    super(props)
    this.state = {
      numberOfChildren: 1
    }
  }

  selectNumberofChilds = (e) => {
    this.setState({ numberOfChildren: e.target.dataset.number })
  }

  renderChildrenInputs = () => {
    [...Array(this.state.numberOfChildren)].map((_, i) => {
      return (
        <div className="row">
           <input type="text" class="form-control" aria-describedby="basic-addon1" />
        </div>
      )
    })
  }

  render() {
    const pluralizeChild = this.state.numberOfChildren > 1 ? 'Children' : 'Child'
    return (
      <div>
        <h1>POWER OF ATTORNEY FOR CARE OF A MINOR CHILD</h1>
        <p>1of 5POWER OF ATTORNEY FOR CARE OF A MINOR CHILDUse  of  this  form  is  authorized  by  T.C.A.  §  34-6-301  et  seq.    Completion  of  this  form, along with the proper signatures, is sufficient to authorize enrollment of a minor in school and  to  authorize  medical  treatment.    However,  a  school  district  may  require  additional documentation/information as permitted by this section of Tennessee law before enrolling a child in school or any extracurricular activities.</p>
        <p><strong>Part I:</strong>  To be filled out and/or initialed by parent(s)/legal guardian(s)</p>
        <div className="btn-group">
          <button className="btn dropdown-toggle" data-toggle="dropdown">{`${this.state.numberOfChildren} ${pluralizeChild}`}</button>
          <button className="btn dropdown-toggle" data-toggle="dropdown">
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
            {[...Array(20)].map((_, i) => {
              const number = i + 1
              return (<li key={number}><a href="#" data-number={number} onClick={this.selectNumberofChilds}>{number}</a></li>)
            })}
          </ul>
        </div>
        <div className="row">
        <p>1. Minor Child's Name</p>
        {this.renderChildrenInputs()}
        </div>
        <div className="row">
          <p>2. Mother/Legal Guardian’s Name & Address</p> <input />
        </div>
        <div className="row">
          <p>3. Father/Legal Guardian’s Name & Address</p> <input />
        </div>
        <div className="row">
          <p>4. Caregiver’s Name & Address</p> <input />
        </div>
        <div>
          <p> 5. Both  parents  are  living,have  legal  custody  of  the  minor  child  and  have signed this document;OR(____)One parent is deceased;OR(____)One  parent  has  legal  custody  of  the  minor  child  and  both  parents  have signed this document and consent to the appointment of the caregiver;OR(____) One parent has legal custody of the minor child, and has sent by Certified Mail, Return Receipt requested, to the other parent at last known address, a  copy  of  this  document  and  a  notice  of  the  provisions  in  §  34-6-305;  or the non-custodial parent has not consented to the appointment and consent cannot be obtained because ______________________________</p>
        </div>
      </div>
    )
  }
}


export default PoAForm