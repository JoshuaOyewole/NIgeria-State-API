const router = require('express').Router();
const states = require('../../States');
const { v4: uuidv4 } = require('uuid');

//GET ALL STATES
router.get('/', (req, res) => {
    res.status(200).json(states)
})

//GET SINGLE STATE
router.get('/:name', (req, res) => {

    //Convert the first character to an uppercase 
    const transformSearch = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);

    //check if the state name inputed is correct and available
    const found = states.some(state => state.name === transformSearch);

    //Display an error message if the inputed state is not found
    if (!found) {
        return res.status(404).json({ "Error": "Inputed state not found. Kindly check your spellings and retry again!" });
    }

    //Filter out the state from the total states available
    res.status(200).json(states.filter(state => state.name === transformSearch))
})

//ADD STATES
router.post('/', (req, res) => {

    const transformStateInputed = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);

    //Create a new state
    const newState = {
        id: uuidv4(),
        name: transformStateInputed,
        population: req.body.population
    }

    //Check  if a state already exist in a Database
    const ifFound = states.some(state => {
        return state.name === newState.name
    })

    //Check if the state and population was filled successfully
    //If NOT then throw an error and ask the user to fill a state.

    if (!newState.population || !newState.name) {
        return res.status(400).json({ 'Error': `Kindly fill the state name and population` })
    }
    else if (ifFound) {
        return res.status(400).json({ 'Error': 'State already exist' })
    }
    else {
        states.push(newState);
        return res.status(200).json(states)
    }
})

//UPDATE STATES
router.put('/:name', (req, res) => {

    //Convert the first character to an uppercase 
    const transformSearch = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);

    //check if the state name inputed is correct and available
    const found = states.some(state => state.name === transformSearch);

    //Display an error message if the inputed state is not found
    if (!found) {
        return res.status(404).json({ "Ërror": "Inputed state not found. Kindly check your spellings and retry again!" });
    }

    //Filter out the state from the total states available. If correct, update the data in the DB 
    states.forEach(state => {
        if (state.name === transformSearch) {
            state.name = req.body.name ? req.body.name : state.name; //If the state name was not updated then the former name should remain.

            state.population = req.body.population ? req.body.population : state.population;//If the state population was not updated then the former state population should remain.
        }
    })

    //Send a Response message of success
    res.status(200).json(states);
})

//DELETE A STATE
router.delete("/:name", (req, res) => {
    //Convert the first character to an uppercase 
    const transformSearch = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);

    //check if the state name inputed is correct and available
    const found = states.some(state => state.name === transformSearch);

    //Display an error message if the inputed state is not found
    if (!found) {
        return res.status(404).json({ "Error": "Inputed state not found. Kindly check your spellings and retry again!" });
    }

    const updatedStates = states.filter(state => state.name !== transformSearch)

    //Send a Response message of success
    res.json({ 'Message': `${transformSearch} state has been deleted successfully!` });

})

module.exports = router;