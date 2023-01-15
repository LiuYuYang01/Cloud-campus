Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        delta:{}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 组件初始化
        onEditorReady() {
            this.createSelectorQuery().select('#editor').context((res) => {
                this.editorCtx = res.context
            }).exec()
        },
        // 工具栏
        format(e) {
            let {
                name,
                value
            } = e.target.dataset

            if (!name) return
            this.editorCtx.format(name, value)
        },
        // 撤销
        undo() {
            this.editorCtx.undo()
        },
        // 恢复
        redo() {
            this.editorCtx.redo()
        },
        // 插入图片
        // insertImage() {
        //     this.editorCtx.insertImage()
        // },
        // 删除操作
        clear() {
            this.editorCtx.clear()
        },
        // 发布内容
        release() {
            // 获取编辑器内容
            this.editorCtx.getContents({
                success: (res) => {
                    this.setData({
                        delta:res
                    })
                }
            })
        },
    }
})