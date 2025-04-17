function getClassName(cls) {
    var className = '';
    var list = cls.split(' ');
    for (var i = 0; i < list.length; i++) {
        className += ' skeleton-' + list[i];
    }

    return className;
}

module.exports = {
    getClassName: getClassName,
};
