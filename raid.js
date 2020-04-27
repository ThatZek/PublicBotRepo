const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = class Raid {
    constructor() {
        this.raidData = {
            channel: "",
            raidLeader: "",
            keys: [],
            vials: [],
            raiders: [],
            boosters: [],
            afkMsg: "",
            status: "",
            type: "",
            location: "",
            timeStarted: "",
        }
        this.collector = undefined;
    };
    startAFK(raidLeader, afkMsg, type) {
        this.raidData.raidLeader = raidLeader;
        this.raidData.status = "afk";
        this.raidData.afkMsg = afkMsg;
        this.raidData.type = type;
        return this.raidData;
    };
    async endAFK() {
        this.raidData.status = "raid";
        await this.collector.stop();
        this.collector = undefined;
        this.timeStarted = new Date(Date.now());
        return "status set to raid";
    };
    endRun() {
        this.raidData.raidLeader = "";
        this.raidData.keys = [];
        this.raidData.raiders = [];
        this.raidData.vials = [];
        this.raidData.boosters = [];
        this.raidData.afkMsg = "";
        this.raidData.type = "";
        this.raidData.status = "none";
        this.raidData.timeStarted = "";
        return "status set to none";
    };
    fetchRaidData() {
        return this.raidData;
    };
    setRaidChannel(channel) {
        this.raidData.channel = channel;
    };

    fetchStatus() {
        return this.raidData.status;
    };

    addKey(userID) {
        this.raidData.keys.push(userID);
    };

    addRaider(raiderID) {
        this.raidData.raiders.push(raiderID);
    };
    setCollector(collector) {
        this.collector = collector;
    };

    setLocation(server, bazaar) {
        this.raidData.location = server + ' ' + bazaar;
    };

    getLocation() {
        return this.raidData.location;
    };

    fetchAFK() {
        return this.raidData.afkMsg;
    };
    setAFK(afkMsg) {
        this.raidData.afkMsg = afkMsg;
    };
    getType() {
        return this.raidData.type;
    };
    getRaidLeader() {
        return this.raidData.raidLeader;
    };
    getKeys() {
        return this.raidData.keys;
    };
    getRaiders() {
        return this.raidData.raiders;
    };
    getCollector() {
        return this.collector;
    };
    addVial(vial) {
        this.raidData.vials.push(vial);
    }
    getVials() {
        return this.raidData.vials;
    };
    setData() {
        this.raidData = {
            channel: "",
            raidLeader: "",
            keys: [],
            vials: [],
            raiders: [],
            boosters: [],
            afkMsg: "",
            status: "",
            type: "",
            location: "",
            timeStarted: "",
        }
    };
    addBooster(booster) {
        this.raidData.boosters.push(booster);
    }
    getBoosters() {
        return this.raidData.boosters;
    };
}