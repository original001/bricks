import React from 'react';

const BRICKS_CLASSES = {
  1: 'lg',
  2: 'md',
  3: 'sm',
  4: 'xs'
};

const buildName = (name, surname, middlename) => {
  return [name, surname, middlename].filter(val => val).map(val => val[0]).join('.');
};

const Brick = (props) => {
  const {segment, name, surname, middlename, ind} = props;
  const disabled = props.disabled === '1' ? true : false;
  const brickClass = `brick ${BRICKS_CLASSES[segment]} ${disabled && 'disabled'}`;
  return (
    <div className='brick-wrapper'>
      <div onClick={() => disabled || props.onClick(props)} 
        className={brickClass}>
        {buildName(name, surname, middlename)}
      </div>
      {disabled && (name || surname || middlename) && <div className='tooltip'>{[name, surname, middlename].join(' ')}</div>}
      <div className={`brick-shadow ${BRICKS_CLASSES[segment]}`}></div>
    </div>
  )
}

export default Brick
