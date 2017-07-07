import { Selector } from 'testcafe';

fixture `Dropdown tests`
    .page `http://localhost:3000/`;

test('Алжир test', async t => {
    await t
        .typeText('.dropdown__search-input', 'Алжир')

    .expect(Selector('.dropdown__suggest-item-highlighted').innerText).eql('Алжир')
        .expect(Selector('.dropdown__suggest-item-highlighted').count).eql(1);
});

test('Empty', async t => {
    await t
        .click('.dropdown__search-input')

    .expect(Selector('.dropdown__suggest-item-highlighted').count).eql(0)
        .expect(Selector('.dropdown__suggest-item').count).eql(5);
});

test('Select Норвегия', async t => {
    await t
        .typeText('.dropdown__search-input', 'норв')
        .expect(Selector('.dropdown__suggest-item-highlighted').innerText).eql('Норв')
        .expect(Selector('.dropdown__suggest-item').innerText).contains('Норвегия')
        .expect(Selector('.dropdown__suggest-item-highlighted').count).eql(1)

    .click('.dropdown__suggest-item')
        .expect(Selector('.dropdown__search-input').value).eql('Норвегия');
});

// ./node_modules/.bin/testcafe firefox tests/test1.js