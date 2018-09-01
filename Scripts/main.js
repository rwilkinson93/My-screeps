// import modules
var creepCreation = require('mod.spawner');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    creepCreation.run(spawn);

    //prints the total energy available to the console
    console.log("Total energy: " + Game.spawns.Mainbase.room.energyAvailable);
    //prints the total number of creeps to the console.
    console.log("Total creeps: " + numberOfCreeps);
    //prints the number of harvester creeps to the console.
    console.log("Total harvester creeps: " + numberOfHarvesters);
    //prints the number of upgrader creeps to the console
    console.log("Total upgrader creeps: " + numberOfUpgraders);
    //prints the number of builder creeps to the console
    console.log("Total builder creeps: " + numberOfBuilders);
    //prints the number of repairer creeps to the console
    console.log("Total repairer creeps: " + numberOfRepairers);
    // line break in the console
    // TO CHANGE: replace with console clear command and move to top of the loop
    console.log("")
};
