import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    chipData: [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
    ],
  };

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }

    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes, data, isEdit } = this.props;
    if(data === undefined){
      var tags =[];
    }
    else{
      var tags = data.split(',');
    }
    return (
      
      <div className={classes.root}>
        {tags.map((name, index) => {
          let icon = null;
          return (
            isEdit? 
            <Chip
              key={index}
              icon={icon}
              label={name}
              style={{height:20}}
              onDelete={this.handleDelete(tags)}
              className={classes.chip}
              clickable
            />
            : <Chip
              key={index}
              icon={icon}
              label={name}
              style={{height:20}}
              className={classes.chip}
              clickable = {false}
            />
          );
        })}
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
