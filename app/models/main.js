/**
 * Created by bryannissen on 10/25/15.
 */

var CVCS = CVCS || {};

(function (CVCS) {
  'use strict';

  /**
   * Generates GUID for various objects through the Data Layer
   *
   * @returns {string}
   */
  CVCS.generateGUID = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  }

  /**
   * Player Object used throughout the App.
   * Contains a platers personal info as well as information on games and computers
   */
  CVCS.player = function () {
    this._id = CVCS.generateGUID();     // Unique ID
    this.name = "Player Name";          // Name or Alias of Player
    this.games = [];                    // Array of playerGame Objects. Contains informaiton
                                        //   on time played and relative skill
    this.computers = [];                // Array of computer computer objects
    this.avatar = '';                   // URL to User Avatar
                                        //   TODO: Add default user avatar and make default URL
                                        //   TODO: Actually remotely implemnt avatars.
  }

  /**
   * A Merged Objcet used to populate the GAMES array in the PLAYER object.
   * Holds both the GAME's info, and some information specific to that PLAYER
   */
  CVCS.playerGame = function () {
    this._id = CVCS.generateGUID();   // Unique ID

    this.gameId = '';                 // ID of Associated Game
    this.playerId = '';               // ID of Associated Player

    this.hoursPlayed = 0;             // Number of Hours played in this game
                                      //  TODO: Get from Steam
    this.skillLevel = 0;              // Player's Skill level in the game, used for balancing
                                      //  TODO: Calculate based on Round data?
  }

  /**
   * Game Object used throughout the site
   * TODO: Pull games and metadata from Steam API
   */
  CVCS.game = function () {
    this._id = CVCS.generateGUID();   // Unique ID

    this.name = 'Game Name';          // Name of the game
    this.genre = 'Game\'s Genre'      // Genre of the game.
                                      //   TODO: Get from Steam
    this.tags = [];                   // Tags assocaited with the game, add by users or pulled from Steam.
                                      //   TODO: Get From Steam
    this.boxArt = '';                 // URL to image of box art
                                      //   TODO: Add Default URL
                                      //   TODO: Get From steam or another source.
    this.steamId = null;              // ID of the game in Steam's System
                                      //   TODO: Figure out how to get game data from steam
  }

  /**
   * Computer object that is owned by a player
   * Contians information on the computer and it's relative spcs and ratings.
   */
  CVCS.computer = function () {
    this._id = CVCS.generateGUID();     // Unique ID

    this.name = 'Computer Name';        // Name of the computer to distinguish it
    this.ownerId = null;                // Id of the player object that owns this computer
    this.specs = {                      // Specs assocaited with the computer
                                        //   TODO: Create Objects for each part type?
      ram: null,                        // Amount of and Type of RAM
      cpu: null,
      gpu: null,
      drive: null
    };
    this.rating = 0;                    // Rating assigned to the computer for quality. Currently
                                        //   just entered by the user.
                                        //   TODO: Generate based on input parts
    this.isDesktop = true;              // Bool on whether or not computer is a Desktop or Laptop
    this.isMain = true;                 // Bool on whether or not this computer is the owner's
                                        //   main computer or a backup they brought.
  }

  CVCS.team = function () {
    this._id = CVCS.generateGUID();     // Unique ID

    this.name = 'Basement Team';        // Name of the team, typically where it's located or
                                        //   another clear identifier
    this.computers = [];                // Computers associated with the table.
                                        //   NOTE: Will rarely change during LAN
    this.players = [];                  // Players currently on the team
                                        //   NOTE: Will change almost every round
    this.spots = 0;                     // Spots for computers/players on this team
    this.avatar = '';                   // URL to team avatar
                                        //   TODO: Use Default URL for default Avatar
                                        //   TODO: Implement Team avatars
  }

})(CVCS);