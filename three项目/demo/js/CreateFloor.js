/**
 * 创建地板
 * @param  {ht.DataModel} dm 数据容器
 */
var createFloor = function(dm) {
    /** 创建地板节点 */
    var floor = new ht.CSGNode();
    floor.s3(1200, 10, 1000);
    floor.p3(0, -5, 0);
    floor.s({
        'all.color': '#D3E0D7',
        'top.image': 'floor',
        'top.uv.scale': [7.8, 9.3]
    });
    dm.add(floor);

    /** 在地板节点上挖个小斜坡 */
    var csg = new ht.CSGNode();
    csg.setHost(floor);
    csg.s3(132, 10, 121);
    csg.p3(-245, 2, 440);
    csg.r3(Math.PI / 63, 0, 0);
    csg.s({
        'all.visible': false
    });
    dm.add(csg);

    /**
     * 真正的斜坡面
     * 本来在地板的挖空节点上可以设置这个斜坡面的，
     * 但是却选择不在上面直接显示，是因为会有多个面重叠在一起，
     * 在不同角度上看这个面，会出现重叠的现象，因此放弃这个方案，
     * 选择独立创建一个节点用来显示斜坡面。
     */
    var steep = new ht.Node();
    steep.setHost(floor);
    steep.s3(132, 9, 121);
    steep.p3(-245, 2, 440);
    steep.r3(Math.PI / 63, 0, 0);
    steep.s({
        'all.visible': false,
        'bottom.visible': true,
        'bottom.image': 'floor',
        'bottom.reverse.flip': true,
        'bottom.uv.scale': [ 1, 2 ]
    });
    dm.add(steep);
};
