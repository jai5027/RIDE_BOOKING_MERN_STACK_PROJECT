const mapService = require("../services/map.service");
const { validationResult } = require('express-validator')

const getCoordinatesController = async (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
      }
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({
        error: "Address is required",
      });
    }

    const data = await mapService.getCoordinates(address);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getDistanceTimeController = async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { origin, destination } = req.query;

    const data = await mapService.getDistanceTime(origin, destination);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAutoCompletesuggestions = async (req, res) => {

      try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

    const { input } = req.query;

    const data = await mapService.getSuggestions(input);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getCoordinatesController,
  getDistanceTimeController,
  getAutoCompletesuggestions
};
