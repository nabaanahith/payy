import React, { Component } from 'react';

class CForm extends Component {
    constructor(props) {
        super(props);

        const currentYear = new Date().getFullYear();
        this.state = {
        showMyComponentcridit:true,
          showMyComponent:true,
            cardNumber: '',
            cardMonth: '',
            cardYear: '',
            monthsArr: Array.from(new Array(12), (x, i) => {
                const month = i + 1;
                return month <= 9 ? '0' + month : month;
            }),
            yearsArr: Array.from(new Array(9), (x, i) => currentYear + i)
        };
    }

    updateMainState = (name, value) => {
        this.props.onUpdateStateValue({
            name,
            value
        });
    };

    handleFormChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
        this.updateMainState(name, value);
    };

    replaceMissingChars = cardNumber => {
        let cardNumberTmp = '#### #### #### ####';
        cardNumberTmp = cardNumberTmp.split('');
        let cardNumberArr = cardNumber.split('');

        let maskedCardNumber = [];
        cardNumberTmp.forEach((val, index) => {
            cardNumberArr[index]
                ? maskedCardNumber.push(cardNumberArr[index])
                : maskedCardNumber.push(val);
        });

        return maskedCardNumber.join('');
    };

    onCardNumberChange = event => {
        let { value, name } = event.target;
        let cardNumber = value;
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            // regular cc number, 16 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        this.setState({ [name]: cardNumber.trimRight() });
        this.updateMainState(name, cardNumber);
    };

    onCvvFocus = event => {
        this.updateMainState('isCardFlipped', true);
    };

    onCvvBlur = event => {
        this.updateMainState('isCardFlipped', false);
    };
   onQiClick = event => {
        this.updateMainState('showMyComponent', true);
    };
    onCriditClick = event => {
        this.updateMainState('showMyComponentcridit', true);
    };

    getSnapshotBeforeUpdate() {
      return this.props.cardNumberRef.current.selectionStart;
    }

    /* Modifying the cardNumber input anywhere but the end of
    the line causes the cursor to jump to the end. This is
    because the value is reformatted with different spacing
    (ie. react doesn't know what to do with the cursor for
    changes between re-renders)

    https://github.com/facebook/react/issues/955#issuecomment-150714427

    This issue is fixed by manually repositioning the cursor
    to account for any additional spacing that is added/removed
    */
    componentDidUpdate(prevProps, prevState, cursorIdx) {
      const node = this.props.cardNumberRef.current;
      const { cardNumber: cardNum } = this.state;
      const { cardNumber: prevCardNum } = prevState;
      if (
        cardNum.length > prevCardNum.length &&
        cardNum[cursorIdx - 1] === " "
      ) {
        cursorIdx += 1;
      } else if (prevCardNum[cursorIdx - 1] === " ") {
        cursorIdx -= 1;
      }
      node.selectionStart = node.selectionEnd = cursorIdx;
    }

    render() {
        const { cardMonth, cardYear, monthsArr, yearsArr } = this.state;
        const {
            cardNumberRef,
            cardHolderRef,
            cardDateRef,
            cardCvvRef,
            onCardInputFocus,
            onCardInputBlur
        } = this.props;
        return (






























            <div className="card-form">
        
                {/* <div id="cars"className="card-list">{this.props.children}</div> */}
                <div className="card-form__inner" id="card-form__inner">
                <h3>
                QiPay gateway 
            </h3>
                <h6>
                All transactions are secure and encrypted
            </h6>
<div className="card-header">


<input type="radio" id="inputy"  type="radio" name="exampleRadios" id="exampleRadios1" value="option1" 
onClick={()=>{

    this.setState({ showMyComponent: true });
    this.updateMainState('showMyComponent', true);
    this.setState({ showMyComponentcridit: false });
    this.updateMainState('showMyComponent', true);
    this.updateMainState('showMyComponentcridit', false);

}}
      src={process.env.PUBLIC_URL + '/circlr.png'}
                                      alt=""
                                   /> 
                                     <label className="form-check-label" for="exampleRadios1">CriditCart</label>

        <text>
                                   {/* CriditCart */}
                                   </text>

                          <div className="imgs">
                          <img className="u2"
src={process.env.PUBLIC_URL + '/yuyu.png'}
                                      alt=""
                                   /> 
<img className="u2"
                                   src={process.env.PUBLIC_URL + '/visa.png'}
                                      alt=""
                                   /> 

<img className="u2"
                                   src={process.env.PUBLIC_URL + '/amex.png'}
                                      alt=""
                                   />
                              </div>         

                           

  
  </div>
 
  <div   id="all" style={this.state.showMyComponent ? {} : { display: 'none' }} >

                    <div className="card-input">
                        <label
                            htmlFor="cardNumber"
                            className="card-input__label"
                        >
                            Card Number
                        </label>
                       

                  
                   
                        <input
                 id="cardnumber"
                            type="tel"
                            name="cardNumber"
                            className="card-input__input"
                            autoComplete="off"
                            onChange={this.onCardNumberChange}
                            maxLength="19"
                            ref={cardNumberRef}
                            onFocus={e => onCardInputFocus(e, 'cardNumber')}
                            onBlur={onCardInputBlur}
                            value={this.state.cardNumber}
                        />
                   </div>

                    <div className="card-input">
                        <label htmlFor="cardName" className="card-input__label">
                           Name on card
                        </label>
                        <input
                           id="cardname"
                            type="text"
                            className="card-input__input"
                            autoComplete="off"
                            name="cardHolder"
                            onChange={this.handleFormChange}
                            ref={cardHolderRef}
                            onFocus={e => onCardInputFocus(e, 'cardHolder')}
                            onBlur={onCardInputBlur}
                        />
                    </div>

                    <div className="card-form__row">
                        <div className="card-form__col">
                            <div className="card-form__group">
                                <label
                                    htmlFor="cardMonth"
                                    className="card-input__label"
                                >
                                    Expiration Date
                                </label>
                                <select
                                    className="card-input__input -select"
                                    value={cardMonth}
                                    name="cardMonth"
                                    onChange={this.handleFormChange}
                                    ref={cardDateRef}
                                    onFocus={e =>
                                        onCardInputFocus(e, 'cardDate')
                                    }
                                    onBlur={onCardInputBlur}
                                >
                                    <option value="" disabled>
                                        Month
                                    </option>

                                    {monthsArr.map((val, index) => (
                                        <option key={index} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="cardYear"
                                    className="card-input__input -select"
                                    value={cardYear}
                                    onChange={this.handleFormChange}
                                    onFocus={e =>
                                        onCardInputFocus(e, 'cardDate')
                                    }
                                    onBlur={onCardInputBlur}
                                >
                                    <option value="" disabled>
                                        Year
                                    </option>

                                    {yearsArr.map((val, index) => (
                                        <option key={index} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="card-form__col -cvv">
                            <div className="card-input">
                                <label
                                    htmlFor="cardCvv"
                                    className="card-input__label"
                                >
                                    CVV
                                </label>
                           
                                <input
                                  id="cvv"
                                    type="tel"
                                    className="card-input__input"
                                    maxLength="4"
                                    autoComplete="off"
                                    name="cardCvv"
                                    onChange={this.handleFormChange}
                                    onFocus={this.onCvvFocus}
                                    onBlur={this.onCvvBlur}
                                    ref={cardCvvRef}
                                />
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="card-header" id="lo">

{/* <input type="radio" className="u"
      src={process.env.PUBLIC_URL + '/circlr.png'}
                                      alt=""
                                      onClick={()=>{ */}

<input 



id="inputy" type="radio"  name="exampleRadios" className="radio" id="exampleRadios2" value="option2"
  
                                      alt=""
                                      onClick={()=>{
this.setState({ showMyComponent: false });
this.updateMainState('showMyComponent', false);
this.setState({ showMyComponentcridit: true });
this.updateMainState('showMyComponentcridit', true);

                                        this.updateMainState('isCardFlipped', true);
                                    }}
                                   /> 
  <label class="form-check-label" for="exampleRadios2">
  QiCard                     
  </label>

        <text>
                                   {/* QiCard */}
                                   </text>

                          <div className="imgsy">
                          <img className="u2y"
src={process.env.PUBLIC_URL + '/qi.jpg'}
                                      alt=""
                                   /> 
{/* <img className="u2"
                                   src={process.env.PUBLIC_URL + '/visa.png'}
                                      alt=""
                                   /> 

<img className="u2"
                                   src={process.env.PUBLIC_URL + '/amex.png'}
                                      alt=""
                                   /> */}
                              </div>         

                           

  
  </div>


  <div id="Qicard" style={this.state.showMyComponentcridit ? {} : { display: 'none' }} >

                   
                       
                        <div className="card-form -cvv">
                            <div className="card-input">
                                <label
                                    htmlFor="cardCvv"
                                    className="card-input__label"
                                >
                                    Card Name
                                </label>
                           
                                <input
                                  id="cvv h"
                                    type="tel"
                                    className="card-input__input"
                                    maxLength="4"
                                    autoComplete="off"
                                    name="cardCvv"
                                    onChange={this.handleFormChange}
                                    onFocus={this.onCvvFocus}
                                    onBlur={this.onCvvBlur}
                                    ref={cardCvvRef}
                                />
                            </div>
                        </div>
                  
                   



                        <div className="card-form -cvv">
                            <div className="card-input">
                                <label
                                    htmlFor="cardCvv"
                                    className="card-input__label"
                                >
                                    PIN
                                </label>
                           
                                <input
                                  id="cvv h"
                                    type="tel"
                                    className="card-input__input"
                                    maxLength="4"
                                    autoComplete="off"
                                    name="cardCvv"
                                    onChange={this.handleFormChange}
                                    onFocus={this.onCvvFocus}
                                    onBlur={this.onCvvBlur}
                                    ref={cardCvvRef}
                                />
                            </div>
                        </div>


















              

                   
                   
                    </div>
                </div>
            
            </div>
            
        );
    }
}

export default CForm;
