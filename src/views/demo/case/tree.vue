<template>
    <div id="class">
        <el-card shadow="never">
            <el-form inline @submit.native.prevent>
                <el-form-item>
                    <el-button @click="addSub(data)">添加一级数据</el-button>
                </el-form-item>
            </el-form>
            <el-tree
                ref="tree"
                :data="data"
                node-key="label"
                default-expand-all
                :expand-on-click-node="false"
                draggable
            >
                <!-- @node-drag-end="handleDragEnd" -->
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <span class="item-label">{{ data.label }}</span>
                    <span class="item-tool">
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="addSub(data)"
                            icon="el-icon-plus"
                        >添加下级</el-button>
                        <el-switch v-model="data.state" :active-value="1" :inactive-value="0"></el-switch>
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="edit(data)"
                            icon="el-icon-edit"
                        ></el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="remove(data)"
                            icon="el-icon-delete"
                        ></el-button>
                    </span>
                </div>
            </el-tree>

            <!-- <el-button @click="save">保存</el-button> -->
            <pre v-html="data" style="font-size:12px"></pre>
        </el-card>
    </div>
</template>
<script>

export default {
    name: 'class',
    data() {
        return {
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            newName: '',
        };
    },
    methods: {
        async addSub(data) {
            try {
                let str = await this.getInputString('', '请输入标题');
                this.$refs.tree.append(this.getNewItem(str), data);
            } catch (e) {
                return
            }

            // let newName = '项目';
            // let children = [];
            // if (!data) {
            //     children = this.data;
            //     newName = this.newName;
            //     this.newName = '';
            // } else {
            //     if (!data.children) data.children = [];
            //     children = data.children;
            // }
            // children.push();
            // let list = JSON.parse(JSON.stringify(this.data));
            // this.data = list;
        },
        async edit(data) {
            try {
                let str = await this.getInputString(data.name, '请输入新标题');
                data.label = str;
            } catch (e) {
            }
        },
        async remove(data) {
            try {
                await this.$confirm('', '确认删除吗？');
            } catch (error) {
                return;
            }
            this.$refs.tree.remove(data);
        },
        async getInputString(title = '请输入', message = '') {
            try {
                let { value } = await this.$prompt(message, title)
                value = value.replace(/\s+/g, "");
                return value;
            } catch (e) {
                throw (e);
            }
        },
        getNewItem(label = '项目') {
            return {
                label: label,
                children: [],
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            // this.save();
        });
    },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";

#class {
    padding: $page-padding;

    .el-tree {
    }

    .custom-tree-node {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        align-items: center;

        .item-label {
            flex: 1;
            font-size: 14px;
        }

        .item-tool {
        }
    }
}

#class /deep/ {
}
</style>