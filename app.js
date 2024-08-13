import express from 'express';
const app = express();
app.use(express.json());
const resources = [];

app.post('/resources', (request, response) => 
{
    const newResource = request.body;
    resources.push(newResource);
    response.status(201).json(newResource);
});

app.get('/resources', (request, response) => 
{
    response.status(200).json(resources);
});

app.put('/resources/:id', (request, response) => 
{
    const { id } = request.params;
    const updatedResource = request.body;
    const resourceIndex = resources.findIndex((el) => el.id === parseInt(id));

    if (resourceIndex === -1) {
        response.status(404).send("Resource not found!");
        return;
    }
    resources[resourceIndex] = { ...resources[resourceIndex], ...updatedResource };
    response.status(200).send("Resource Updated Successfully");
});

app.delete('/resources/:id', (request, response) => 
{
    const { id } = request.params;
    const resourceIndex = resources.findIndex(el => el.id === id);
    if (resourceIndex  == -1) 
    {
        response.status(404).send("Resource not found!");
        return;
    }
    resources.splice(resourceIndex, 1);
    response.status(200).send("Resource deleted successfully");
});

app.listen(3000, () => 
{
    console.log(`Server is running on http://localhost:3000`);
});
