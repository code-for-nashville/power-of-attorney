import PoAForm from '.';
import React, { ReactDOM, Component } from 'react';
import { Modal as ReactModal } from 'react-modal';

class Disclaimer extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Accept</button>
        </ReactModal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<Disclaimer {...props} />, document.getElementById('main'))

export default Disclaimer


// disclaimer copy
// Immigrant parents may face detainment or deportation with little warning. Since parents may work in the same location or be in the same location when picked up by ICE/immigration, their children can be left without any legal guardian. When picked up by ICE/Immigration, parents are often unavailable or inaccessible for days or weeks (and can even be deported before ever having access to their children or family). Parents can sign a power of attorney for the minor children to give guardianship of their child to someone they trust, which takes effect only if they are detained or deported.
// FAQ - What is this document for?
// This document was created to help parents in Tennessee who may be in danger of being detained and/or deported. This form gives a caregiver temporary guardianship of your child. This power of attorney only goes into effect if you are detained or deported. This form is temporary only – permanent guardianship would need to be given by a court.
//
// Who should I choose as my caregiver?
//
// Your caregiver should be someone you trust. This document will give them the power to make decisions for your child as if they were you and in the best interests of the child. You can end this power of attorney at any time by putting in writing that you no longer want this person to have power of attorney over your child.
//
// Where can I learn more about power of attorney for a minor child?
//
// The law itself can be found here: https://law.justia.com/codes/tennessee/2010/title-34/chapter-6/part-3/
