<template>
    <div>
        <el-card>
            <el-form ref="queryForm" inline :model="query">
                <el-form-item label="关键字：" prop="name">
                    <el-input v-model="query.name" @keydown.enter.native="updateInit()"></el-input>
                </el-form-item>

                <el-form-item label="上下架：" prop="name">
                    <el-radio-group @change="updateInit()" v-model="query.is_show">
                        <el-radio :label="0">上架</el-radio>
                        <el-radio :label="1">下架</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="类型：" prop="name">
                    <el-select @change="updateInit()" filterable v-model="query.type" placeholder="请选择">
                        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="状态：" prop="name">
                    <el-select @change="updateInit()" multiple v-model="query.state" placeholder="请选择">
                        <el-option label="待审核" :value="1"></el-option>
                        <el-option label="待发布" :value="2"></el-option>
                        <el-option label="已发布" :value="3"></el-option>
                        <el-option label="已封禁" :value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="时间：">
                    <el-date-picker @change="updateInit()" value-format="yyyy-MM-dd HH:mm:ss" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button @click="updateInit()">搜索</el-button>
                    <el-button @click="$refs.queryForm.resetFields();time=[];updateInit()">重置</el-button>
                </el-form-item>
            </el-form>
            <el-form ref="toolForm" inline>
                <el-form-item label>
                    <el-button type="primary" icon="el-icon-plus" @click="$router.push('/')">新增</el-button>
                    <el-button type="primary" @click="saveShow(selectList.map(el=>el.id),1)">批量操作</el-button>
                    <el-button type="primary" @click="saveShow(selectList.map(el=>el.id),0)">批量下架</el-button>
                    <el-button type="primary" @click="del(selectList.map(el=>el.id))">批量删除</el-button>
                </el-form-item>
            </el-form>

            <el-table ref="table" row-key="id" :data="list" v-loading="loading" border @selection-change="e=>selectList=e">
                <el-table-column reserve-selection width="55" align="center" type="selection"></el-table-column>
                <el-table-column prop="id" align="center" width="55" label="#"></el-table-column>
                <el-table-column prop="title" align="left" width="200" label="标题" show-overflow-tooltip></el-table-column>
                <!-- 用作撑开，如果不需要，可以删除 -->

                <el-table-column prop="state">
                    <template slot-scope="scope">
                        <FlowTool v-model="scope.row.state" @change="save(scope.row)" :option="[
                        {label:'待审核',value:1,type:'info'},
                        {label:'待发布',value:2,type:'warning'},
                        {label:'已发布',value:3,type:'success'},
                        {label:'已封禁',value:4,type:'danger'},
                        ]">
                            <!-- <i slot="icon" class="el-icon-right"></i> -->
                        </FlowTool>
                    </template>
                </el-table-column>

                <el-table-column prop="is_show" align="center" width="80" label="上下架">
                    <template slot-scope="scope">
                        <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.is_show" @change="saveShow([scope.row.id],scope.row.is_show)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" type="text" @click="$router.push(`/edit?id=${scope.row.id}`)">编辑</el-button>
                        <el-button icon="el-icon-view" type="text" @click="$router.push(`/info?id=${scope.row.id}`)">查看</el-button>
                        <el-button icon="el-icon-delete" type="text" @click="del([scope.row.id])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin:10px 0" @size-change="update()" @current-change="update()" :current-page.sync="query.page" :page-size.sync="query.size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            time: [],
            types: [],
            //查询参数
            query: {
                page: 1,
                size: 10,
                state: [],
                name: "",
                start_time: "",
                end_time: "",
                type: '',
            },
            loading: false, //主数据加载状态
            list: [], //主数据
            selectList: [], //被选择
            total: 0, //主数据总数
        };
    },
    watch: {
        time(v) {
            if (v.length >= 2) {
                this.query.start_time = v[0];
                this.query.end_time = v[1];
            } else {
                this.query.start_time = "";
                this.query.end_time = "";
            }
        },
        selectList(v) {
            console.warn('当前选择的数据为：');
            console.warn(v);
            console.warn(v.map(el => el.id));
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.httpTypes();
            this.updateInit();
        },
        updateInit() {
            this.query.page = 1;
            this.update();
        },
        async save(row) {
            console.warn('要保存的数据：');
            console.warn(row);
            this.update();
            // try {
            //     const res = await this.$http.post('', { ids: ids });
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
        async saveShow(ids = [], is_show) {
            console.warn('要保存的id：', ids);
            console.warn('要保存的状态：', is_show);
            if (ids.length <= 0) {
                this.$message.warning('未选择任何项目！');
                return;
            }
            this.loading = true;
            try {
                const res = await this.$http.post('/save', { ids: ids, is_show: is_show });
                if (res.code >= 0) {
                    this.$message.success('操作成功！');
                } else {
                    throw (res);
                }
            } catch (e) {
                this.$message.error('操作失败！');
                console.error(e);
            }
            this.update();
        },
        async del(ids = []) {
            if (ids.length <= 0) {
                this.$message.warning('未选择任何项目！');
                return;
            }
            try {
                await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { type: 'warning' });
            } catch (e) {
                this.$message.info('已取消操作～');
                return
            }
            this.loading = true;
            try {
                const res = await this.$http.post('/del', { ids: ids });
                if (res.code >= 0) {
                    this.$message.success('操作成功！');
                } else {
                    throw (res);
                }
            } catch (e) {
                this.$message.error('操作失败！');
                console.error(e);
            }
            this.updateInit();
        },
        update() {
            this.httpList();
        },
        async httpList() {
            this.loading = true;
            console.warn('查询参数为：');
            console.warn(this.query);
            setTimeout(() => {
                this.loading = false;
                this.total = 200;
                this.list = new Array(this.total)
                    .fill("")
                    .map((el, i) => ({ id: i, title: `测试数据${i}`, state: 1, is_show: 1 })).splice((this.query.page - 1) * this.query.size, this.query.size);
            }, 500);
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
        async httpTypes() {
            this.types = new Array(10).fill('').map((el, i) => ({ id: i, name: `类型${i}` }));
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
};
</script>
<style lang="scss" scoped>
</style>