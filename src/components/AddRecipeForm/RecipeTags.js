import React from 'react';
import PropTypes from 'prop-types';
import MdClear from 'react-icons/lib/md/clear';
import FlexBox from '../common/FlexBox';
import TextInput from './TextInput';
import Button from '../common/Button';
import TagContainer from './TagContainer';
import Label from './Label';
import Heading from '../common/Heading';
import IconCircle from '../common/IconCircle';
import uniqueId from '../../utils/uniqueId';

class RecipeTags extends React.Component {
  state = {
    newTag: ''
  }

  addNewTag = () => {
    const name = this.state.newTag.trim();
    if (name.length > 0) {
      const tags = this.props.tags.slice('');
      const newTag = {
        id: uniqueId(),
        name
      };
      tags.push(newTag);
      this.props.updateList(tags, 'tags');
      this.setState({
        newTag: ''
      });
    }
  }

  deleteTag = (e) => {
    const newArr = this.props.tags.filter(tag => tag.id !== e.currentTarget.id);
    this.props.updateList(newArr, 'tags');
  }

  handleChange = (e) => {
    this.setState({
      newTag: e.target.value
    });
  }

  render() {
    const { tags } = this.props;
    return (
      <div>
        <Heading>Please Add Tags</Heading>
        <FlexBox>
          <Label hidden htmlFor="newTag">Ingridients</Label>
          <TextInput
            listInput
            placeholder="#Awesome!"
            id="newTag"
            value={this.state.newTag}
            onChange={this.handleChange}
          />
          <Button
            noMargin add // eslint-disable-line
            onClick={this.addNewTag}
          >+</Button>
        </FlexBox>
        <ul>
          {tags.map(tag => (
            <TagContainer key={tag.id} tag={tag.name}>
              <IconCircle topCenter small id={tag.id} onClick={this.deleteTag}>
                <MdClear />
              </IconCircle>
            </TagContainer>
          ))}
        </ul>
      </div>
    );
  }
}

RecipeTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })).isRequired,
  updateList: PropTypes.func.isRequired,
};

export default RecipeTags;