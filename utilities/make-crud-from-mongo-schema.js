/** 
 * Create an object containing helper functions to make crud operations out of mongoose models.
 * First argument is the name for one object in the collection (used for error messages).
 * Second argument is the mongoose model.
 * Third is the property name used to uniquely identify an instance of the model.
 * 
 * @example See controllers/tag-controller.js
 */
module.exports = function (name, model, uniqueProperty) {
  // Return an object with a bunch of anonymous functions
  return {
    /**
     * Make an asynchronous express request handler to list all objects in the collection by their unique name.
     */
    makeList: () => async (req, res) => {
      const projection = {};
      projection[uniqueProperty] = true;
      const result = await model.find({}, projection);
      res.json(result.map(doc => doc[uniqueProperty]));
    },
    /**
     * Make an asynchronous express request handler to create an object and add it to the collection.
     * The 'C' in 'CRUD'
     */
    makeCreate: () => async (req, res) => {
      try {
        const obj = new model();
        Object.assign(obj, req.body);
        await obj.save();
        res.send('Ok');
      } catch(e) {
        if (e.name === "MongoError" && e.code === 11000)
          return res.status(409).send();
        else if (e.name === "ValidationError")
          return res.status(400).send(e.message.substr(e.message.indexOf(": ")+2));
        else
          throw e;
      }
    },
    /**
     * Make an asynchronous express request handler to return one object from the collection with the given route parameter name.
     * The 'R' in 'CRUD'
     */
    makeRead: (routeParamName) => async (req, res) => {
      const filter = {};
      filter[uniqueProperty] = req.params[routeParamName];
      const result = await model.findOne(filter);
      if(!result) return res.status(404).send(`A ${name} with that ${uniqueProperty} cannot be found.`);

      res.json(result);
    },
    /**
     * Make an asynchronous express request handler to update one object from the collection with the given route parameter name.
     * The 'U' in 'CRUD'
     */
    makeUpdate: (routeParamName) => async (req, res) => {
      const filter = {};
      filter[uniqueProperty] = req.params[routeParamName];
      const obj = await model.findOne(filter);
      if(!obj) return res.status(404).send(`A ${name} with that ${uniqueProperty} cannot be found.`);

      try {
          Object.assign(obj, req.body);
          await obj.save();
          res.send('Ok');
      } catch(e) {
          if (e.name === "MongoError" && e.code === 11000)
              return res.status(409).send();
          else if (e.name === "ValidationError")
              return res.status(400).send(e.message.substr(e.message.indexOf(": ")+2));
          else
              throw e;
      }
    },
    /**
     * Make an asynchronous express request handler to delete an object from the collection with the given route parameter name.
     * The 'D' in 'CRUD'
     */
    makeDelete: (routeParamName) => async (req, res) => {
      const filter = {};
      filter[uniqueProperty] = req.params[routeParamName];
      const obj = await model.findOne(filter);
      if(!obj) return res.status(404).send(`A ${name} with that ${uniqueProperty} cannot be found.`);

      await obj.delete();

      res.status(204).send();
    }
  };
};
