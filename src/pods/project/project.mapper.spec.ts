import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('pods/project/project.mapper specs', () => {
  it('should return empty project when feeding null value', () => {
    // Arrange
    const project = null;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty project when feeding undefined value', () => {
    // Arrange
    const project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected project when feeding valid project but with null employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: true,
      employees: null,
    };

    const expectedProject: viewModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedProject);
  });

  it('should return expected project when feeding valid project but with undefined employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: false,
      employees: undefined,
    };

    const expectedProject: viewModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: false,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedProject);
  });

  it('should return expected project when feeding valid project with empty employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: false,
      employees: [],
    };

    const expectedProject: viewModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: false,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedProject);
  });

  it('should return expected project when feeding valid project with filled employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: false,
      employees: [
        {
          id: 'test-id',
          isAssigned: true,
          employeeName: 'test-name',
        },
      ],
    };

    const expectedProject: viewModel.Project = {
      id: 'test-id',
      name: 'test-name',
      externalId: 'test-external-id',
      comments: 'test-comments',
      isActive: false,
      employees: [
        {
          id: 'test-id',
          isAssigned: true,
          employeeName: 'test-name',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedProject);
  });
});
