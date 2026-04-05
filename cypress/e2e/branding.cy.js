describe('Branding Check', () => {
  it('should show "Daigna Village Social" in the page title', () => {
    cy.visit('/');
    cy.title().should('include', 'Daigna Village Social');
  });

  it('should not show "Bhisara" or "Bisara" anywhere on the home page', () => {
    cy.visit('/');
    // Check for "Bhisara" or "Bisara" anywhere on the page (body)
    cy.get('body').should('not.contain', 'Bhisara');
    cy.get('body').should('not.contain', 'bhisara');
    cy.get('body').should('not.contain', 'Bisara');
    cy.get('body').should('not.contain', 'bisara');
  });
  
  it('should show the updated brand name if displayed in text', () => {
     cy.visit('/');
     // We can just look for the text "Daigna Village Social"
     cy.contains('Daigna Village Social').should('be.visible');
  });
});
