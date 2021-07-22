<template>
    <div>
        <el-card>
            <el-form ref="queryForm" inline :model="query">
                <el-form-item label="关键字：" prop="name">
                    <el-input v-model="query.name" @keydown.enter.native="updateInit()"></el-input>
                </el-form-item>

                <el-form-item label="上下架：" prop="name">
                    <el-radio-group v-model="query.state">
                        <el-radio :label="0">上架</el-radio>
                        <el-radio :label="1">下架</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="时间：">
                    <el-date-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button @click="updateInit()">搜索</el-button>
                    <el-button @click="$refs.queryForm.resetFields();time=[]">重置</el-button>
                </el-form-item>
            </el-form>
            <el-form ref="toolForm" inline>
                <el-form-item label>
                    <el-button type="primary" icon="el-icon-plus" @click="$router.push('/')">新增</el-button>
                    <el-button type="primary" @click="save(selectList.map(el=>el.id),1)">批量操作</el-button>
                    <el-button type="primary" @click="save(selectList.map(el=>el.id),0)">批量下架</el-button>
                </el-form-item>
            </el-form>

            <el-table
                ref="table"
                row-key="id"
                :data="list"
                v-loading="loading"
                border
                @selection-change="e=>selectList=e"
            >
                <el-table-column reserve-selection width="55" align="center" type="selection"></el-table-column>
                <el-table-column prop="id" align="center" width="55" label="#"></el-table-column>
                <el-table-column
                    prop="title"
                    align="left"
                    width="200"
                    label="标题"
                    show-overflow-tooltip
                ></el-table-column>
                <!-- 用作撑开，如果不需要，可以删除 -->
                <el-table-column></el-table-column>

                <el-table-column prop="state" align="center" width="80" label="上下架">
                    <template slot-scope="scope">
                        <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.state"
                            @change="save([scope.row.id],scope.row.state)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" type="text">编辑</el-button>
                        <el-button icon="el-icon-view" type="text">预览</el-button>
                        <el-button icon="el-icon-delete" type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                style="margin:10px 0"
                :current-page.sync="query.page"
                :page-size.sync="query.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {

    data() {
        return {
            time: [],
            //查询参数
            query: {
                page: 1,
                size: 10,
                name: '',
                start_time: '',
                end_time: '',
            },
            loading: false,//主数据加载状态
            list: [],//主数据
            selectList: [],//被选择
            total: 0,//主数据总数
        };
    },
    watch: {
        'query.page'() {
            this.update();
        },
        'query.size'() {
            this.update();
        },
        time(v) {
            if (v.length >= 2) {
                this.query.start_time = v[0];
                this.query.end_time = v[1];
            } else {
                this.query.start_time = '';
                this.query.end_time = '';
            }
            this.updateInit();
        },
    },
    mounted() {
        this.updateInit();
    },
    methods: {
        updateInit() {
            if (this.query.page == 1) {
                this.update();
            } else {
                this.query.page = 1;
            }
        },
        async save(ids, state) {
            // try {
            //     const res = await this.$http.post('', { ids: ids, state: state });
            //     if (res.code >= 0) {
            //         this.$message.success('操作成功！');
            //     } else {
            //         throw (res);
            //     }
            // } catch (e) {
            //     this.$message.error('操作失败！');
            //     console.error(e);
            // }
        },
        update() {
            this.httpList();
        },
        async httpList() {
            this.list = new Array(20).fill('').map((el, i) => ({ id: i, title: `测试数据${i}`, state: 1 }));
            // try {
            //     const res = await this.$http.post('', this.query);
            //     this.total = res.total;
            //     if (res.code >= 0) {
            //         this.list = res.data;
            //     } else {
            //         throw (res);
            //     }
            // } catch (e) {
            //     this.$message.error('接口异常！');
            //     this.list = [];
            //     console.error(e);
            // }
        },
    },
}
</script>
<style lang="scss" scoped>
</style>