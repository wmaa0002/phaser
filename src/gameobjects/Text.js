/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Create a new <code>Text</code>.
* @class Phaser.Text
* @constructor
* @param {Phaser.Game} game - Current game instance.
* @param {number} x - X position of the new text object.
* @param {number} y - Y position of the new text object.
* @param {string} text - The actual text that will be written.
* @param {object} style - The style object containing style attributes like font, font size ,
*/
Phaser.Text = function (game, x, y, text, style) {

    x = x || 0;
    y = y || 0;
    text = text || '';
    style = style || '';

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = game;
 
    /**
    * @property {boolean} exists - If exists = false then the Sprite isn't updated by the core game loop or physics subsystem at all.
    * @default
    */
    this.exists = true;

    /**
    * @property {boolean} alive - This is a handy little var your game can use to determine if a sprite is alive or not, it doesn't effect rendering.
    * @default
    */
    this.alive = true;

    /**
    * @property {Phaser.Group} group - The parent Group of this Sprite. This is usually set after Sprite instantiation by the parent.
    */
    this.group = null;

    /**
    * @property {string} name - The user defined name given to this Sprite.
    * @default
    */
    this.name = '';

    /**
    * @property {number} type - The const type of this object.
    * @default
    */
    this.type = Phaser.TEXT;

    /**
    * @property {string} _text - Internal value.
    * @private
    */
    this._text = text;

    /**
    * @property {string} _style - Internal value.
    * @private
    */
    this._style = style;

    PIXI.Text.call(this, text, style);

    /**
     * @property {Phaser.Point} position - The position of this Text object in world space.
     */
    this.position.x = this.x = x;
    this.position.y = this.y = y;

    /**
    * The anchor sets the origin point of the texture.
    * The default is 0,0 this means the textures origin is the top left 
    * Setting than anchor to 0.5,0.5 means the textures origin is centered
    * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right
    *
    * @property {Phaser.Point} anchor - The anchor around with Sprite rotation and scaling takes place.
    */
    this.anchor = new Phaser.Point();
    
    /**
    * @property {Phaser.Point} scale - The scale of the object when rendered. By default it's set to 1 (no scale). You can modify it via scale.x or scale.y or scale.setTo(x, y). A value of 1 means no change to the scale, 0.5 means "half the size", 2 means "twice the size", etc.
    */
    this.scale = new Phaser.Point(1, 1);

    /**
    * @property {object} _cache - A mini cache for storing all of the calculated values.
    * @private
    */
    this._cache = {

        dirty: false,

        //  Transform cache
        a00: 1,
        a01: 0,
        a02: x,
        a10: 0,
        a11: 1,
        a12: y,
        id: 1,

        //  The previous calculated position
        x: -1,
        y: -1,

        //  The actual scale values based on the worldTransform
        scaleX: 1,
        scaleY: 1

    };

    this._cache.x = this.x;
    this._cache.y = this.y;

    /**
    * @property {boolean} renderable - A renderable object will be rendered to the context each frame.
    */
    this.renderable = true;

};

Phaser.Text.prototype = Object.create(PIXI.Text.prototype);
Phaser.Text.prototype.constructor = Phaser.Text;

/**
* Automatically called by World.update.
* @method Phaser.Text.prototype.update
*/
Phaser.Text.prototype.update = function() {

    if (!this.exists)
    {
        return;
    }

    this._cache.dirty = false;

    this._cache.x = this.x;
    this._cache.y = this.y;

    if (this.position.x != this._cache.x || this.position.y != this._cache.y)
    {
        this.position.x = this._cache.x;
        this.position.y = this._cache.y;
        this._cache.dirty = true;
    }

}

/**
* @method Phaser.Text.prototype.destroy
*/
Phaser.Text.prototype.destroy = function() {

    if (this.group)
    {
        this.group.remove(this);
    }

    if (this.canvas.parentNode)
    {
        this.canvas.parentNode.removeChild(this.canvas);
    }
    else
    {
        this.canvas = null;
        this.context = null;
    }

    this.exists = false;

    this.group = null;

}

/**
* Get
* @returns {Description}
*//**
* Set
* @param {Description} value - Description
*/
Object.defineProperty(Phaser.Text.prototype, 'angle', {

    get: function() {
        return Phaser.Math.radToDeg(this.rotation);
    },

    set: function(value) {
        this.rotation = Phaser.Math.degToRad(value);
    }

});

Object.defineProperty(Phaser.Text.prototype, 'content', {

    get: function() {
        return this._text;
    },

    set: function(value) {

        //  Let's not update unless needed, this way we can safely update the text in a core loop without constant re-draws
        if (value !== this._text)
        {
            this._text = value;
            this.setText(value);
        }

    }

});

Object.defineProperty(Phaser.Text.prototype, 'font', {

    get: function() {
        return this._style;
    },

    set: function(value) {

        //  Let's not update unless needed, this way we can safely update the text in a core loop without constant re-draws
        if (value !== this._style)
        {
            this._style = value;
            this.setStyle(value);
        }

    }

});
