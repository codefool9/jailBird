/**
 * Created by byronjones on 7/24/14.
 */
function JailBird(clsName) {
    var timer = setInterval(update, 50),
        defaultWidth = 79,
        defaultHeight = 106,
        y = 200,
        x = 100,
        reverse = false,
        frames = {
            stance: {
                frames: [
                    {x: -20, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth * 2, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth * 3, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth * 4, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth * 5, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth * 6, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth * 7, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -20 - defaultWidth * 8, y: -10, width: defaultWidth, height: defaultHeight}
                ]
            },
            turn: {
                frames:[
                    {x: -916, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -834, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -758, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -834, y: -10, width: defaultWidth, height: defaultHeight},
                    {x: -916, y: -10, width: defaultWidth, height: defaultHeight}
                ]
            },
            duck: {
                frames:[
                    {x: -1353, y: -13, width: 83, height: 102},
                    {x: -1436, y: -33, width: 87, height: 82, ox: -5},
                    {x: -1523, y: -42, width: 87, height: 73, ox: -6}
                ]
            },
            duckTurn: {
//                dependencies: [function () {
//                    return ducked ? '' : 'duck';
//                }],
                frames:[
                    {x: -1029, y: -40, width: 89, height: 75},
                    {x: -1124, y: -40, width: 80, height: 75},
                    {x: -1211, y: -40, width: 82, height: 76, wait: 2},
                    {x: -1124, y: -40, width: 80, height: 75},
                    {x: -1029, y: -40, width: 89, height: 75}
                ]
            },
            walk: {
                frames: [
                    {x: -1639, y: -7, width: 72, height: 108},
                    {x: -1710, y: -7, width: 72, height: 108},
                    {x: -1781, y: -7, width: 72, height: 108},
                    {x: -1852, y: -7, width: 72, height: 108},
                    {x: -1923, y: -7, width: 72, height: 108},
                    {x: -1994, y: -7, width: 79, height: 108},
                    {x: -2072, y: -7, width: 73, height: 108},
                    {x: -2218, y: -7, width: 72, height: 108},
                    {x: -2289, y: -7, width: 72, height: 108}
                ]
            }
        },
        target = frames.stance,
        index = 0,
        wait = 0,
        repeat = 0,
        el;

    this.y = function (value) {
        if (value !== undefined) {
            y = value;
        }
        return y;
    };

    this.x = function (value) {
        if (value !== undefined) {
            x = value;
        }
        return x;
    };

    this.play = function (name) {
        if (frames[name] === target) {
            repeat = 1;
            return;
        }
        target = frames[name] || frames.stance;
        index = 0;
        wait = 0;
    };

    this.reverse = function (value) {
        if (value !== undefined) {
            reverse = !!value;
        }
        return reverse;
    }

    function update() {
        var t, f, fms, depIndex, dep;
        if (target.dependencies) {
            depIndex = 0;
            fms = [];
            while (depIndex < target.dependencies.length) {
                dep;
                if (typeof target.dependencies[depIndex] === 'function') {
                    dep = target.dependencies[depIndex]();
                } else {
                    dep = target.dependencies[depIndex];
                }
                if (dep) {
                    fms = fms.concat.apply(fms, frames[target.dependencies[depIndex]].frames);
                }
                depIndex += 1;
            }
            fms = fms.concat.apply(fms, target.frames);
        } else {
            t = target;
            fms = t.frames;
        }
        if (!fms[index]) {
            if (repeat > 0) {
                repeat -= 1;
            } else {
                target = frames.stance;
            }
            index = 0;
            wait = 0;
            t = target;
            fms = t.frames;
        }
        f = fms[index];
        if (!el) {
            el = document.getElementsByClassName(clsName)[0];
            el.style.position = 'absolute';
            el.style.background = "url(images/jailBird-sprite.png) no-repeat";
        }
        if (el) {
            if (reverse) {
                el.style.webkitTransform = 'scaleX(-1)';
            } else {
                el.style.webkitTransform = '';
            }
            el.style.backgroundPosition = f.x + "px " + f.y + "px";
            el.style.width = f.width + 'px';
            el.style.height = f.height + 2 + 'px'; // add a little just below the height so toes don't get cut off.
            el.style.top = y - f.height + 'px';
            el.style.left = x + (f.ox || 0) + 'px';
        }
        if (f.wait && wait < f.wait) {
            wait += 1;
        } else {
            index += 1;
        }
    }
}