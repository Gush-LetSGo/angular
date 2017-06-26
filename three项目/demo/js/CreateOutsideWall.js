/**
 * 创建外面的墙体
 * @param  {ht.DataModel} dm 数据容器
 */
var createOutsideWall = function(dm) {
    /**
     * 因为只创建左右两边的墙体，而且两面墙体只有位置不一样，
     * 其他的都是一样的，所以通过循环创建
     **/
    for (var i = 0, x = -1; i < 2; i++, x *= -1) {
        /** 创建墙体 */
        var wall = new ht.CSGNode();
        wall.s3(20, 160, 1000);
        wall.p3(590 * x, 80, 0);
        wall.s({
            'front.image': 'outsideImage',
            'back.image': 'outsideImage',
            'left.image': 'outsideImage',
            'right.image': 'outsideImage',
            'all.color': 'white'
        });
        dm.add(wall);

        /** 窗户挖空 */
        var left = new ht.CSGNode();
        left.setHost(wall);
        left.s3(20, 90, 1000);
        left.p3(590 * x, 90, 0);
        left.setParent(wall);
        left.s({ 'all.visible': false });
        dm.add(left);

        /** 创建玻璃 */
        var win = new ht.Node();
        win.s3(5, 90, 1000);
        win.p3(590 * x, 90, 0);
        win.setHost(wall);
        win.setParent(wall);
        win.s({
            'all.opacity': 0.6,
            'all.image': 'winImage',
            'all.blend': 'yellow',
            'all.transparent': true,
            'all.reverse.cull': true,
            'all.uv.scale': [ 50, 6]
        });
        dm.add(win);
    }
};
