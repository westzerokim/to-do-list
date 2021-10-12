import React from 'react';
import PropTypes from 'prop-types'
import './App.css';


const NewComponent = ({ name, children}) =>{
    return(
        <div className ="react">
            안녕하세요, 제 이름을 왜 궁금해하세요? 암튼 제 이름은{name}입니다요.<br />
            children 값은 {children}입니다요!
        </div>
    );
};

NewComponent.defaultProps ={
    name: "안알랴줌"
};

NewComponent.propTypes ={
    name:PropTypes.array
};
  

export default NewComponent;