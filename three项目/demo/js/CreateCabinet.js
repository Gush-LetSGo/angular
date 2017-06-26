/**
 * 创建机柜
 */
var createCabinet = function(dm) {
    /**
     * 创建单个机柜
     * @param  {ht.DataModel} dm       数据容器
     * @param  {string}       objName  机柜模型名称
     * @param  {string}       doorName 机柜门贴图
     * @param  {array}        s3       机柜大小
     * @param  {array}        p3       机柜坐标
     * @return {ht.Node}               机柜对象
     */
    var create = function(dm, objName, doorName, reverseName, s3, p3) {
        /** 创建机柜对象，并引用机柜模型 */
        var node = new ht.Node();
        node.s({
            'shape3d' : objName
        });
        node.s3(s3);
        dm.add(node);

        /** 创建机柜门，并吸附到机柜上 */
        var door = new ht.DoorWindow();
        door.s3(s3[0], s3[1], 3);
        door.p3(0, 0, -s3[2] / 2);
        door.setHost(node);
        door.s({
            'all.color': 'black',
            'all.blend': '#567C72',
            'back.image': doorName,
            'front.image': reverseName,
            'dw.toggleable': true,
            'dw.axis': 'left',
            'dw.end': -Math.PI * 0.6,
            'all.reverse.cull': true
        });
        dm.add(door);

        /**
         * 设置机柜位置及旋转角度，让机柜门朝外，
         * 在最后设置机柜位置是为了让机柜和机柜门一起移动
         */
        node.setHost(door);
        node.p3(p3);
        node.setRotationY(Math.PI);
        return node;
    };

    /** 用 Ajax 方式请求机柜模型，并做相应的解析 */
    ht.Default.loadObj('./objs/nyf.obj', './objs/nyf.mtl', {
        cube: true,
        center: true,
        shape3d: 'nyf',
        finishFunc: function(modelMap, array, rawS3) {
            /** 修改模型大小，让其适应场景大小 */
            var k = 150 / rawS3[1];
            rawS3 = rawS3.map(function(v) { return v * k; });

            /** 预存创建机柜时用到的数值 */
            var disX = rawS3[0], disX2 = disX / 2 + 0.1,
                disY2 = rawS3[1] / 2 + 1;
            /** 分组创建机柜 */
            for (var i = 0; i < 7; i++) {
                create(dm, 'nyf', 'cabinetFrontDoor', 'cabinetBackDoor', rawS3, [ disX2 + (disX + 1) * i - 6, disY2, 175 ]);
            }

            for (i = 0; i < 3; i++) {
                create(dm, 'nyf', 'cabinetFrontDoor', 'cabinetBackDoor', rawS3, [ -110 - (disX + 1) * i, disY2, 175 ]);
            }

            for (i = 0; i < 4; i++) {
                create(dm, 'nyf', 'cabinetFrontDoor', 'cabinetBackDoor', rawS3, [ -110 - (disX + 1) * i, disY2, -175 ]);
            }
        }
    });
};
