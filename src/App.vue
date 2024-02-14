<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template lang="pug">
navigation-bar

router-view
</template>

<style>
.validation-error {
	margin-top: 0.25rem;
	font-size: 0.875em;
	color: var(--bs-form-invalid-color);
}
</style>
