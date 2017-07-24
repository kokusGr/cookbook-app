import React from 'react';
import PropTypes from 'prop-types';
import MdClear from 'react-icons/lib/md/clear';
import Button from '../common/Button';
import Label from './Label';
import TextInput from './TextInput';
import FlexBox from '../common/FlexBox';
import ListItem from './ListItem';
import Heading from '../common/Heading';
import IconCircle from '../common/IconCircle';
import uniqueId from '../../utils/uniqueId';

class RecipeIngridients extends React.Component {

  state = {
    newIngridient: ''
  }

  addNewIngridient = () => {
    const name = this.state.newIngridient.trim();
    if (name.length > 0) {
      const ingridients = this.props.ingridients.slice('');
      const newIngridient = {
        id: uniqueId(),
        name
      };
      ingridients.push(newIngridient);
      this.props.updateList(ingridients, 'ingridients');
      this.setState({
        newIngridient: ''
      });
    }
  }

  deleteIngridient = (e) => {
    const newArr = this.props.ingridients
      .filter(ingridient => ingridient.id !== e.currentTarget.id);
    this.props.updateList(newArr, 'ingridients');
  }

  handleChange = (e) => {
    this.setState({
      newIngridient: e.target.value
    });
  }

  render() {
    const { ingridients } = this.props;
    return (
      <div>
        <Heading>Please Add Needed Ingridients</Heading>
        <FlexBox>
          <Label hidden htmlFor="ingridients">Ingridients</Label>
          <TextInput
            listInput
            placeholder="Potatoes... ?"
            id="newIngridient"
            value={this.state.newIngridient}
            onChange={this.handleChange}
          />
          <Button
            noMargin add // eslint-disable-line
            id="newIngridient"
            onClick={this.addNewIngridient}
          >+</Button>
        </FlexBox>
        <ul>
          {ingridients.map(ingridient => (
            <ListItem key={ingridient.id}>
              <IconCircle leftCenter small id={ingridient.id} onClick={this.deleteIngridient}>
                <MdClear />
              </IconCircle>
              {ingridient.name}
            </ListItem>
          ))}
        </ul>
      </div>
    );
  }
}

RecipeIngridients.propTypes = {
  ingridients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })).isRequired,
  updateList: PropTypes.func.isRequired,
};

export default RecipeIngridients;