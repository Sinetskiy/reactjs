//console.log(React);
//console.log(ReactDOM);

//ReactDOM.render(
//React.createElement('h1', null, 'Привет, Мир!'),
//document.getElementById('root')
//);
var my_news = [
{
author: 'Саша Печкин',
text: 'В четчерг, четвертого числа...',
bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертиличёрными чернилами чертёж.'
},
{
author: 'Просто Вася',
text: 'Считаю, что $ должен стоить 35 рублей!',
bigText: 'А евро 42!'
},
{
author: 'Гость',
text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
}
];

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },  
    render: function() {
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;
        
     //   console.log('render',this);
        
        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className='news__text'>{text}</p>
                {/* для ссылки readmore: не показывай ссылку, если visible === true */}
                <a href="#" 
                    onClick={this.readmoreClick} 
                    className={'news__readmore ' + (visible ? 'none': '')}>
                    Подробнее
                </a>
                {/* для большо текста: не показывай текст, если visible === false */}
                <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
            </div>
            )
        }
    });

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            counter: 0
        }
    },       
    render: function() {
        var data = this.props.data;
        var newsTemplate;
        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                        <div key={index}>
                            <Article data={item} />
                        </div>
                    )
        });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

       // console.log(newsTemplate);

        return (
            <div className="news">
            {newsTemplate}
            <strong 
                className={'news__count ' + (data.length > 0 ? '':'none')} >
                 Всего новостей: {data.length}
            </strong>
            </div>
        );
    }
});

var Add = React.createClass({
    getInitialState: function() { //устанавливаем начальное состояние (state)
        return {
            // btnIsDisabled: true   // второй вариант решение "Контролируемый компонент"
                agreeNotChecked: true,
                authorIsEmpty: true,
                textIsEmpty: true
            };
    },
    onAuthorChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({authorIsEmpty: false})
        } else {
            this.setState({authorIsEmpty: true})
        }
    },
    onTextChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({textIsEmpty: false})
        } else {
            this.setState({textIsEmpty: true})
        }
    },
    onFieldChange: function(fieldName, e) {
        var next = {}; // мы не можем передать ее напрямую в setState в качестве названия поля объекта.
        if (e.target.value.trim().length > 0) {
        next[fieldName] = false;
            this.setState(next); // или this.setState({[''+fieldName]:false})
        } else {
        next[fieldName] = true;
            this.setState(next); // this.setState({[''+fieldName]:true})
        }
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function(e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(author + '\n' + text);
    },
    onCheckRuleClick: function(e) {
       // ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked;
       this.setState({agreeNotChecked: !this.state.agreeNotChecked}); //устанавливаем значение в state
    },
    render: function() {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    onChange={this.onAuthorChange}
                    defaultValue=''
                    placeholder='Ваше имя'
                    ref='author'
                />
                <textarea
                    className='add__text'
                    onChange={this.onTextChange}
                    defaultValue=''
                    placeholder='Текст новости'
                    ref='text'
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' defaultChecked={false} ref='checkrule' onChange={this.onCheckRuleClick}/>
                    Я согласен с правилами
                </label>
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button' 
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty} >
                    Показать alert
                </button>
            </form>
        );
}
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h3>Новости</h3>
                <Add />
                <News data={my_news} /> {/*добавили свойство data */}
            </div>
            );
        }
    });

ReactDOM.render(
    <App />,
    document.getElementById('root')
);