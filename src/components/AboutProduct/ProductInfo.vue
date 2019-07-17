<template>
    <div>
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" 
            class="image" style="height:100%;float:left;width:100%">
        
        <p>{{getProduct.brandName}}-{{getProduct.name}} : ${{getProduct.price}}</p>
        <p>{{getProduct.description}}</p>
    </div>
</template>

<script>
export default {
  data() {
      return {
          id:this.$route.params.id
      }
  },
  computed:{
      getProduct(){
          console.log("this id is " + this.id)
        for(let i=0;i<this.$store.state.products.length;i++){
            if(this.$store.state.products[i].id === this.id){
                console.log(this.$store.state.products[i])
                return this.$store.state.products[i];
            }
        }  
      }
  }
}
</script>

<style scoped>

</style>
