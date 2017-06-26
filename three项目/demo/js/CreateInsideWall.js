/**
 * 创建内部的墙体，包括墙上的门和窗户
 * @param  {ht.DataModel} dm 数据容器
 */
var createInsideWall = function(dm) {
    /** 创建墙体 */
    var wall = new ht.CSGShape();
    wall.setPoints([
        { x: 0, y: 0 },
        { x: 0, y: -350 },
        { x: -350, y: -350 },
        { x: -350, y: 350 },
        { x: 350, y: 350 },
        { x: 350, y: 0 }
    ]);
    wall.setTall(160);
    wall.setElevation(wall.getTall() / 2);
    wall.setClosePath(true);
    wall.s({
        'front.image': 'outsideImage',
        'back.image': 'outsideImage',
        'left.image': 'outsideImage',
        'right.image': 'outsideImage',
        'all.color': 'white'
    });
    dm.add(wall);

    /** 创建窗户的挖空节点 */
    var winCSG = new ht.CSGNode();
    winCSG.setHost(wall);
    winCSG.setParent(wall);
    winCSG.setTall(110);
    winCSG.setWidth(300);
    winCSG.setElevation(85);
    winCSG.s({
        'attach.index': 3,
        'attach.offset.opposite': true,
        'attach.offset': 200,
        'all.visible': false
    });
    dm.add(winCSG);

    /** 创建小窗台 */
    var table = new ht.Node();
    table.setHost(wall);
    table.setParent(wall);
    table.s3(300, 6, 40);
    table.setElevation(33);
    table.s({
        'all.color': 'white',
        'attach.index': 3,
        'attach.offset.opposite': true,
        'attach.offset': 200,
        'attach.gap': 10
    });
    dm.add(table);

    /** 创建窗户玻璃 */
    var win = new ht.Node();
    win.setHost(wall);
    win.setParent(wall);
    win.s3(300, 104, 5);
    win.setElevation(88);
    win.s({
        'all.opacity': 0.4,
        'all.image': 'winImage',
        'all.blend': 'yellow',
        'all.transparent': true,
        'all.reverse.cull': true,
        'all.uv.scale': [ 15, 6],
        'attach.index': 3,
        'attach.offset.opposite': true,
        'attach.offset': 200
    });
    dm.add(win);

    /**
     * 创建门框，因为 CSG 无法多层嵌套使用，
     * 所以只能通过绘制墙体，然后做旋转处理，作为门框
     */
    var doorBox = new ht.Shape();
    doorBox.setClosePath(true);
    doorBox.setTall(20);
    doorBox.setThickness(6);
    doorBox.setRotationX(Math.PI / 2);
    doorBox.setPoints([
        { x: -63, y: -63 },
        { x: -63, y: 63 },
        { x: 63, y: 63 },
        { x: 63, y: -63 }
    ]);
    doorBox.setHost(wall);
    doorBox.setParent(wall);
    doorBox.setElevation(62);
    doorBox.s({
        'attach.index': 3,
        'attach.offset.relative': true,
        'attach.offset': 0.15,
        'all.color': 'white'
    });
    dm.add(doorBox);

    /** 门的位置挖空 */
    var doorCSG = new ht.CSGNode();
    doorCSG.setHost(wall);
    doorCSG.setParent(wall);
    doorCSG.setTall(120);
    doorCSG.setWidth(120);
    doorCSG.setHeight(30);
    doorCSG.setElevation(62);
    doorCSG.s({
        'attach.index': 3,
        'attach.offset.relative': true,
        'attach.offset': 0.15,
        'all.visible': false
    });
    dm.add(doorCSG);

    /** 左边的门扇 */
    var doorLeft = new ht.DoorWindow();
    doorLeft.setWidth(60);
    doorLeft.setTall(120);
    doorLeft.setElevation(62);
    doorLeft.setHost(wall);
    doorLeft.s({
        'attach.index': 3,
        'attach.offset.relative': true,
        'attach.offset': 0.107,
        'front.image': 'door',
        'back.image': 'door',
        'all.color': '#A95A10',
        'all.blend': '#A95A10',
        'back.uv': [1,0, 1,1, 0,1, 0,0],
        'back.transparent': true,
        'front.transparent': true,
        'all.reverse.cull': true,
        'dw.s3': [ 1, 1, 0.1 ]
    });
    dm.add(doorLeft);

    /** 右边的门扇 */
    var doorRight = new ht.DoorWindow();
    doorRight.setWidth(60);
    doorRight.setTall(120);
    doorRight.setElevation(62);
    doorRight.setHost(wall);
    doorRight.s({
        'attach.index': 3,
        'attach.offset.relative': true,
        'attach.offset': 0.193,
        'front.image': 'door',
        'back.image': 'door',
        'all.color': '#A95A10',
        'all.blend': '#A95A10',
        'front.uv': [1,0, 1,1, 0,1, 0,0],
        'back.transparent': true,
        'front.transparent': true,
        'all.reverse.cull': true,
        'dw.axis': 'right',
        'dw.s3': [ 1, 1, 0.1 ]
    });
    dm.add(doorRight);
};
