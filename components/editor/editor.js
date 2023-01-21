Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    delta: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 组件初始化
    onEditorReady() {
      this.createSelectorQuery()
        .select("#editor")
        .context((res) => {
          this.editorCtx = res.context;
        })
        .exec();
    },
    // 工具栏
    format(e) {
      let { name, value } = e.target.dataset;

      if (!name) return;
      this.editorCtx.format(name, value);
    },
    // 撤销
    undo() {
      this.editorCtx.undo();
    },
    // 恢复
    redo() {
      this.editorCtx.redo();
    },
    // 插入图片
    insertImage() {
      // 选择图片
      wx.chooseImage({
        count: 1,

        success: (res) => {
          // 上传图片
          wx.uploadFile({
            //请求后台的路径
            url: "https://api.tockey.cn/api/upload",
            //小程序本地的路径
            filePath: res.tempFilePaths[0],
            //后台获取我们图片的key
            name: "images",
            //额外的参数formData
            formData: {
              type: "article",
              file: res.tempFilePaths[0],
            },

            success: (res) => {
              //上传成功
              this.editorCtx.insertImage({
                src: JSON.parse(res.data).data.url,
                data: {
                  id: "abcd",
                  role: "god",
                },
                width: "80%",
                
                success: function () {
                  console.log("图片插入成功！");
                },
              });
            },
            fail: function (res) {
              console.log("图片插入失败！");
            },
          });
        },
      });
    },
    // 删除操作
    clear() {
      this.editorCtx.clear();
    },
    // 发布内容
    release() {
      // 获取编辑器内容
      this.editorCtx.getContents({
        success: (res) => {
          this.setData({
            delta: res,
          });
        },
      });
    },
  },
});
