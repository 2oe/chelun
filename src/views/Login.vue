<template>
    <div class="box">
        <h1>登录</h1>
        <el-form status-icon ref="ruleForm2" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名">
                <el-input type="text" v-model="username" autocomplete="off" placeholder="请输入2-5位汉字"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="password" autocomplete="off" placeholder="请输入3-8位任意字符"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            submitForm(){
                if (!/[\u4e00-\u9fa5]{2,5}/.test(this.username)){
                    this.$alert('请输入正确的用户名');
                    return;
                }
                if (!/\w{3,8}/.test(this.password)){
                    this.$alert('请输入正确的密码');
                    return;
                }
                window.localStorage.setItem('login', 'true');
                this.$router.push('/');
            },
            resetForm(){
                this.username = '';
                this.password = '';
            }
        },
        beforeRouteEnter (to, from, next) {
            // ...
            console.log('router enter...');
            next();
        },
        beforeRouteLeave (to, from, next) {
            // ...
            console.log('router leave...');
            next();
        },
        mounted(){
            console.log('mounted...');
        },
        beforeDestroy(){
            console.log('before destory...');
        },
        destroyed(){
            console.log('destoryed...');
        }
    }
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
    height: 100%;
    h1{
        text-align: center;
        font-size: .8rem;
        padding-top: .5rem;
        font-size: .8rem;
    }
}
.demo-ruleForm{
    width: 80%;
    margin: 200px auto;
}
</style>