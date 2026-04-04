describe('Branding Check', () => {
  it('should show "Diagna Village Social" in the page title', () => {
    cy.visit('/');
    cy.title().should('include', 'Diagna Village Social');
  });

  it('should not show "Bhisara" anywhere on the home page', () => {
    cy.visit('/');
    // Check for "Bhisara" anywhere on the page (body)
    cy.get('body').should('not.contain', 'Bhisara');
    cy.get('body').should('not.contain', 'bhisara');
  });
  
  it('should show the updated brand name if displayed in text', () => {
     cy.visit('/');
     // This depends on where the name is normally displayed.
     // If it's in the state as "Diagna Village Social", we check if it renders.
     // We can just look for the text "Diagna Village Social"
     cy.contains('Diagna Village Social').should('be.visible');
  });
});
