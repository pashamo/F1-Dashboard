import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(5),
  },
  rootSlider: {
    width: 200,
  },
  rootDropdown: {
    width: '100%',
  },
  headingDropdown: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


function valuetext(value) {
  return `${value}°C`;
}


const PointsRangeSlider = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.rootSlider}>
      <Slider
        value={value}
        min={0}
        max={500}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
};


const SimpleAccordion = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.rootDropdown}>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.headingDropdown}>Filter Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterOptions teamFilter={props.teamFilter} setTeamFilter={props.setTeamFilter}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


const FilterOptions = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setTeamFilter({ ...props.teamFilter, [event.target.name]: event.target.checked });
  };

  const { ar, at, ferrari, haas, mclaren, mercedes, rp, rb, renault, williams } = props.teamFilter;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Teams</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={ar} onChange={handleChange} name="ar" />}
            label="Alfa Romeo"
          />
          <FormControlLabel
            control={<Checkbox checked={at} onChange={handleChange} name="at" />}
            label="AlphaTauri"
          />
          <FormControlLabel
            control={<Checkbox checked={ferrari} onChange={handleChange} name="ferrari" />}
            label="Ferrari"
          />
          <FormControlLabel
            control={<Checkbox checked={haas} onChange={handleChange} name="haas" />}
            label="Haas F1"
          />
          <FormControlLabel
            control={<Checkbox checked={mclaren} onChange={handleChange} name="mclaren" />}
            label="McLaren"
          />
          <FormControlLabel
            control={<Checkbox checked={mercedes} onChange={handleChange} name="mercedes" />}
            label="Mercedes"
          />
          <FormControlLabel
            control={<Checkbox checked={rp} onChange={handleChange} name="rp" />}
            label="Racing Point"
          />
          <FormControlLabel
            control={<Checkbox checked={rb} onChange={handleChange} name="rb" />}
            label="Red Bull"
          />
          <FormControlLabel
            control={<Checkbox checked={renault} onChange={handleChange} name="renault" />}
            label="Renault"
          />
          <FormControlLabel
            control={<Checkbox checked={williams} onChange={handleChange} name="williams" />}
            label="Williams"
          />
        </FormGroup>

      </FormControl>
    </div>
  );
}


const FilterDriverTable = (props) => {
  return(
    <div>
      <SimpleAccordion 
        teamFilter={props.teamFilter} 
        setTeamFilter={props.setTeamFilter}/>
    </div>
  );
};

export default FilterDriverTable;
