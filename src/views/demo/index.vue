<template>
    <div id="demoHome">
        <div class="nav-panel">
            <div class="nav-list">
                <div class="nav-item" v-for="(item, i) in cases" :key="i">
                    <router-link :to="item.path">{{item.title}}</router-link>
                </div>
            </div>
        </div>
        <div class="demo-view">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cases: [
                { path: '/demo/case/list', title: '列表页面' },
                { path: '/demo/case/form', title: '表单页面' },
                { path: '/demo/case/tree', title: 'tree页面' },
            ]
        }
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
#demoHome {
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
    .nav-panel {
        width: 200px;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border-right: solid 1px #ddd;
        .nav-list {
            overflow: auto;
            flex: 1;
            padding: 20px 0;
            .nav-item {
                font-size: 14px;
                .router-link-active {
                    color: #fff;
                    background-color: #333;
                }
                a {
                    color: #333;
                    line-height: 1;
                    padding: 10px;
                    display: block;
                }
                a:hover {
                    background-color: #333;
                    color: #fff;
                }
            }
        }
    }
    .demo-view {
        flex: 1;
        overflow: hidden;
        overflow: auto;
        background-color: #f6f6f6;
        padding: 20px;
    }
}
</style>