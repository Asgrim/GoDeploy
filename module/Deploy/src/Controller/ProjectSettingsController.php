<?php

namespace Deploy\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Deploy\Service\ProjectService;
use Deploy\Service\TaskService;
use Deploy\Service\TargetService;

class ProjectSettingsController extends AbstractActionController
{
    /**
     * @var \Deploy\Service\ProjectService
     */
    protected $projectService;

    /**
     * @var \Deploy\Service\TaskService
     */
    protected $taskService;

    /**
     * @var \Deploy\Service\TargetService
     */
    protected $targetService;

    public function __construct(ProjectService $projectService, TaskService $taskService, TargetService $targetService)
    {
        $this->projectService = $projectService;
        $this->taskService = $taskService;
        $this->targetService = $targetService;
    }

    public function indexAction()
    {
        $project = $this->projectService->findByName($this->params('project'));

        return [
        	'project' => $project,
        ];
    }

    public function viewTasksAction()
    {
        $project = $this->projectService->findByName($this->params('project'));

        $tasks = $this->taskService->findByProjectId($project->getId());

        return [
            'project' => $project,
            'tasks' => $tasks,
        ];
    }

    public function viewTargetsAction()
    {
        $project = $this->projectService->findByName($this->params('project'));

        $targets = $this->targetService->findByProjectId($project->getId());

        return [
            'project' => $project,
            'targets' => $targets,
        ];
    }
}