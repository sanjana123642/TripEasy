const User = require("../models/User");

// Get all agents
const getAgents = async (req, res) => {
    try {
        const agents = await User.find({
            role: "agent"
        }).select("-password");

        res.json(agents);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch agents",
            error: error.message
        });
    }
};

// Get one agent
const getAgentById = async (req, res) => {
    try {
        const agent = await User.findOne({
            _id: req.params.id,
            role: "agent"
        }).select("-password");

        if (!agent) {
            return res.status(404).json({
                message: "Agent not found"
            });
        }

        res.json(agent);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch agent",
            error: error.message
        });
    }
};

module.exports = {
    getAgents,
    getAgentById
};