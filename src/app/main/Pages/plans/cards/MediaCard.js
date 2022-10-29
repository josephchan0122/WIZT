import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import {FuseAnimate} from '@fuse';
import {Icon} from '@material-ui/core';

const styles = {
  card: {
    position: "relative",
    marginBottom: 20,
    width: 345,
    backgroundColor:"#303030",
  },
  media: {
    height: 100,
    width: 100,
    margin: 'auto', 
    marginTop:20,
    alignSelf:"center",
  },
  
  color:{
    color:"#fff"
  },
  backgroundColor:{
    backgroundColor:"#3c4252"
  }
};

class  MediaCard extends React.Component {

  edit = (id) => {
    const {history} = this.props;
    history.push({
      pathname: "/admin/plans/edit",
      state: { plan_id : id }
    });
  }
  render(){
    const { classes, id, title, sub_name, currency, description, imageURL} = this.props;
    const paragraph = description.split(',');

    return (
      <FuseAnimate animation="transition.flipBounceXIn"  duration={300}>
        <Card className={classes.card}>
          <CardHeader 
            title={title}
            classes={{title:classes.color}}
            className={classes.backgroundColor}
          />
          <CardActionArea style={{justifyContent:"center", position:"relative"}}>
            <CardMedia
              className={classes.media}
              image={imageURL? imageURL: "/assets/images/plans/free_plan.png"}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography  classes={{h6:classes.color}} variant="h6" component="h3" align="center">
                {sub_name}
              </Typography>
              <Typography  classes={{h6:classes.color}} variant="h6" component="h3" align="center">
                {currency}
              </Typography>
  
              { paragraph.map((content, index) => {
                  return(
                    <Typography key={index} classes={{subtitle1:classes.color}} variant="subtitle1" component="p" align="center">
                      {content}
                    </Typography>
                  );
                }
              )}
            </CardContent>
          </CardActionArea>
          <CardActions style={{ justifyContent:"flex-end", alignItems: "flex-end", backgroundColor:"#3c4252", position:"absolute", top:4, right:0}}>
            <Fab color="default" aria-label="Edit" 
              onClick={()=>{
                this.edit(id)
              }}
              size="small"
            >
              <Icon>edit_icon</Icon>
            </Fab>
          </CardActions>
        </Card>
      </FuseAnimate>
    );
  }
  
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);