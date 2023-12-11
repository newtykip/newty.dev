<script lang="ts">
	import Project from "$lib/components/Project.svelte";

	interface Project {
		title: string;
		description?: string;
		link?: string;
		repo?: string;
	}

	const projects: Project[] = [
		{
			title: "a",
			description: "hsdsdeyhsdsdeyhsdsdeyhsdsdeyh",
			repo: "newtykins/ProjectileDing"
		},
		{
			title: "oxa"
		},
		{
			title: "johnny"
		},
		{
			title: "ProjectileDing",
			description: "",
			repo: "newtykins/ProjectileDing"
		},
		{
			title: "oxidise"
		},
		{
			title: "johnny"
		}
	];
</script>

<div class="grid grid-cols-4 gap-10">
	{#each projects as project}
		<Project title={project.title} description={project.description} repo={project.repo} />
	{/each}
</div>

<!-- 
<div class="grid grid-cols-[{Math.max(projects.length, 4)}]">
	{#each projects as project}
		<Project title="Project" description="This is a project" link="https://google.com" />
	{/each}
</div> -->
